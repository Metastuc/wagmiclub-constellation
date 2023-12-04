// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface IRequestBuilder {
function getRequest(string[] calldata args) external returns(bytes memory);
}