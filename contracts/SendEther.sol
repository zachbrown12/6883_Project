// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
import "./BaseTransaction.sol";

contract SendEther is BaseTransaction {
  address payable private recipient;
  address private executor;
  uint16  private delayedDays; // unit: days since 2020, max = 65535 days
  bool private isExercised; // set to true when the will is exercised

  constructor (Conditions _cond,
              address payable _recip,
              address  _executor,
              uint16 _delayLength) public {
    isExercised = false;
    recipient = _recip;
    executor = _executor;
    delayedDays = _delayLength;

    if (_cond == Conditions.IMMEDIATE){
      sendPayment(recipient);
      isExercised = true;
    } else if (_cond == Conditions.DELAYED_TRANSFER){
      // todo send a message to the recipient to notify this 
      // delayed contract has been put in place
    } else if (_cond == Conditions.COSIGNER_INITIATED){
      // todo send a message to the executor to notify
      // this contract is in place
    } else {
      // not supported for now
    }
  }

  modifier byRecipient() {
    require(msg.sender == recipient, 'Not the Recipient');
    _;
  }

  modifier byExecutor() {
    require(msg.sender == executor, 'Not the Executor');
    _;
  }

  function sendPayment(address payable _to) public payable byOwner {
    // todo implement this
    // (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    // require(sent, "Failed to send Ether");
  }

  function inherit() public byRecipient {
    if (!isExercised) {
      // find the differences in days, make sure the latest block's 
      // time stamp is greater than the delayed days
      uint256 remainingDays = block.timestamp / 86400 - 18980;
      if (remainingDays > delayedDays){
        sendPayment(recipient);
        isExercised = true;
      }
    }
  }

  function execute() public byExecutor {
    if (!isExercised) {
      sendPayment(recipient);
      isExercised = true;
    }
  }
}
