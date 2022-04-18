// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract BaseTransaction {
  enum Conditions {
    DELAYED_TRANSFER,
    COSIGNER_INITIATED,
    CUSTOM
  }

  address payable private owner; 

  constructor () public {
    owner = msg.sender;
  }

  event AnnounceAddress(string _s, address _a);
  event AnnounceNumber(string _s, uint _n);

  modifier byOwner() {
    require(msg.sender == owner, 'Not Owner');
    _;
  }

  function voidContract() public byOwner {
    // delete the contract and send remaining balance back to owner
    selfdestruct(owner);
  }
}