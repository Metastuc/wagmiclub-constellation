// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {IRequestBuilder} from "./IRequestBuilder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Medals is ERC1155, FunctionsClient, AutomationCompatibleInterface, ConfirmedOwner {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _medalCount; // Counter for badges minted

    string public returnedString;
    uint256 public lastBlockNumber;
    bytes public request;
    uint256 public deadline;
    IRequestBuilder requestBuilder;
    // hardcode these values on deployment
    uint256 blockInterval;
    uint64 public subscriptionId;
    uint32 public gasLimit;
    bytes32 public donID;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint256 public s_upkeepCounter;
    uint256 public s_requestCounter;
    uint256 public s_responseCounter;
    uint256 public tokenId;

    // mapping of users interested in a medal
    mapping (uint256 => address[]) public questers;

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event RequestRevertedWithErrorMsg(string reason);
    event RequestRevertedWithoutErrorMsg(bytes data);

    constructor(address router, string memory uri_, address builderAddress) ERC1155(uri_) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        blockInterval = 5;
        subscriptionId = 1069;
        gasLimit = 300000;
        donID = 0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;
        requestBuilder = IRequestBuilder(builderAddress);
    }

    function addressToString(address _address) public pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_address))); // Convert address to bytes32
        bytes memory alphabet = "0123456789abcdef"; // Define hexadecimal alphabet
        bytes memory str = new bytes(42); // Allocate memory for the string (address is 20 bytes, each byte represented by 2 hex characters, plus '0x' prefix)
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint(uint8(value[i + 12] >> 4))];
            str[3 + i * 2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
        }
        return string(str);
    }

    // function to create medal
    function createMedal(uint256 _deadline) public {
        // assigning tokenId
        tokenId = _medalCount.current();
        deadline = _deadline;
        address contractAddress = address(this);
        string memory addressString = addressToString(contractAddress);
        string memory _tokenId = Strings.toString(tokenId);
        string[2] memory args = [addressString, _tokenId];
        request = requestBuilder.getRequest(args);
        _medalCount.increment();
    }

    function registerInterest(uint256 _tokenId) external {
        questers[_tokenId].push(msg.sender);
    }

    function stringToUint(string memory _input) public pure returns (uint256) {
        bytes memory b = bytes(_input);
        uint256 result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 val = uint256(uint8(b[i]));
            if (val >= 48 && val <= 57) {
                result = result * 10 + (val - 48);
            }
        }
        return result;
    }

   /**
     * @notice Checks if upkeep is needed based on the difference between the current and the last block number.
     * @dev This function checks if the current block number has incremented since the last recorded block number and returns a boolean indicating if upkeep is needed.
     * @return upkeepNeeded A boolean indicating if upkeep is needed (true if the current block number has incremented since the last recorded block number).
     * @return performData An empty bytes value since no additional data is needed for the upkeep in this implementation.
     */
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = block.number - lastBlockNumber > blockInterval; // Check if the current block number has incremented since the last recorded block number
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
        // construct request and put it as perform data
        return (upkeepNeeded, ""); // Return an empty bytes value for performData
    }

    /**
     * @notice Send a pre-encoded CBOR request if the current block number has incremented since the last recorded block number.
     */
    function performUpkeep(bytes calldata /* performData */) external override {
        if (block.number - lastBlockNumber > blockInterval) {
            lastBlockNumber = block.number;
            s_upkeepCounter = s_upkeepCounter + 1;
            try
                i_router.sendRequest(
                    subscriptionId,
                    request,
                    FunctionsRequest.REQUEST_DATA_VERSION,
                    gasLimit,
                    donID
                )
            returns (bytes32 requestId) {
                s_lastRequestId = requestId;
                s_requestCounter = s_requestCounter + 1;
                emit RequestSent(requestId);
            } catch Error(string memory reason) {
                emit RequestRevertedWithErrorMsg(reason);
            } catch (bytes memory data) {
                emit RequestRevertedWithoutErrorMsg(data);
            }
        }
        // We don't use the performData in this example. The performData is generated by the Automation Node's call to your checkUpkeep function
    }

    /// @notice Update the request settings
    /// @dev Only callable by the owner of the contract
    /// @param _request The new encoded CBOR request to be set. The request is encoded off-chain
    /// @param _subscriptionId The new subscription ID to be set
    /// @param _gasLimit The new gas limit to be set
    /// @param _donID The new job ID to be set
    function updateRequest(
        bytes memory _request,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) external onlyOwner {
        request = _request;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
    }

    /**
     * @notice Store latest result/error
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;

        returnedString = string(response);
        uint256 id = stringToUint(returnedString);
        address user = questers[tokenId][id];
        // mint the tokenId
        _mint(user, tokenId, 1, response);
        s_lastError = err;
        s_responseCounter = s_responseCounter + 1;
        emit Response(requestId, s_lastResponse, s_lastError);
    }

}