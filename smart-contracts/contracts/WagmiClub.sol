// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WagmiClub is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _idCount;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        mint();
    }

    function mint() public {
        _mint(msg.sender, _idCount.current());
        _idCount.increment();
    }
}