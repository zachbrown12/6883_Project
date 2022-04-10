// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract BaseTransaction {
  enum Conditions {
    IMMEDIATE,
    DELAYED_TRANSFER,
    COSIGNER_INITIATED,
    CUSTOM
  }

  address payable private owner; 

  constructor () public {
    owner = msg.sender;
  }

  modifier byOwner() {
    require(msg.sender == owner, 'Not Owner');
    _;
  }

  function sendMessage(address _to) public byOwner {
    // todo implement this
  }

  function voidContract() public byOwner {
    // delete the contract and send remaining balance back to owner
    selfdestruct(owner);
  }
}