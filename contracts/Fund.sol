// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Fund is Ownable(msg.sender) {
    uint256 public totalFunds;
    address public payee;
    bool public isReleased;

    constructor(address _payee) payable {
        totalFunds = msg.value;
        payee = _payee;
        isReleased = false;
    }

    function releaseFunds() public onlyOwner {
        isReleased = true;
        payable(payee).transfer(totalFunds);
    }
}