// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


contract Badge is ERC1155, ConfirmedOwner {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _badgeCount; // Counter for badges minted

    constructor(string memory uri_) ERC1155(uri_) ConfirmedOwner(msg.sender) {}

    // mint
    function mint(address to) public {
        _mint(to, _badgeCount.current(), 1, "0x");
        _badgeCount.increment();
    }

    function updateURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    // cancel approve, transfer, transferFrom (make it soul bound)
    function setApprovalForAll(address to, bool approved) public virtual override {
        revert("Soulbound token cannot be approved to another address");
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override {
        revert("Soulbound token cannot be transfered to another address");
    }
}