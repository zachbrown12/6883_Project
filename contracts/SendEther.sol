// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
import "./BaseTransaction.sol";

contract SendEther is BaseTransaction {
  address payable private recipient;
  address private executor;
  Conditions condition;
  uint value;
  uint16  private delayedDays; // unit: days since 2020, max = 65535 days
  bool private isExercised; // set to true when the will is exercised

  constructor (Conditions _cond,
              address payable _recip,
              address  _executor,
              uint16 _delayLength) payable public {
    isExercised = false;
    condition = _cond;
    recipient = _recip;
    executor = _executor;
    delayedDays = _delayLength;
    value = msg.value;

    emit AnnounceAddress("A will was created for ", recipient);
    if (condition == Conditions.DELAYED_TRANSFER){
      emit AnnounceNumber("Days the will is delayed by ", delayedDays);
    } else if (condition == Conditions.COSIGNER_INITIATED){
      emit AnnounceAddress("Assigned executor for the will is ", executor);
    } else {
      // currently not supported
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

  function sendPayment() internal {
    recipient.transfer(value);
  }

  function inherit() public payable byRecipient {
    require(isExercised == false, 'Will has been executed');
    if (condition == Conditions.DELAYED_TRANSFER) {
      // find the differences in days, make sure the latest block's 
      // time stamp is greater than the delayed days
      uint256 remainingDays = block.timestamp / 86400 - 18980;
      if (remainingDays > delayedDays){
        sendPayment();
        isExercised = true;
      }
    }
  }

  function execute() public payable byExecutor {
    require(isExercised == false, 'Will has been executed');
    if (condition == Conditions.COSIGNER_INITIATED) {
      sendPayment();
      isExercised = true;
    }
  }
}