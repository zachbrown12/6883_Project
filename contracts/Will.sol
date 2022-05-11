pragma solidity >=0.4.22 <0.9.0;

contract Will {
    struct Beneficiary {
        string name;
        uint payout;
        address ben_address;
        bool isExercised;
    }

    enum ExecutionTypes {
        DELAYED,
        EXECUTOR,
        CUSTOM
    }

    address payable public owner;
    address public executor;
    address[] public address_array;
    uint public delayedDays;
    uint public executionType;
    mapping(address => Beneficiary) public beneficiaries;

    event distributed(address indexed _from, string _input);

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
    
    function addBeneficiary(string memory name, address ben_address) public restricted {
        Beneficiary memory newBeneficiary = Beneficiary({
            name: name,
            payout: 0,
            ben_address: ben_address,
            isExercised: false
        });

        beneficiaries[ben_address] = newBeneficiary;
        address_array.push(ben_address);
    }

    function updatePayout(address ben_address, uint payout) public restricted {

        Beneficiary storage ben_update = beneficiaries[ben_address];
        ben_update.payout = payout;
    }

    function updateExecutionType(uint exceType) public restricted {
        executionType = exceType;
    }

    function setExecutor(address executorAddress) public restricted {
        executor = executorAddress;
    }

    function setDate(uint delayDuration) public restricted {
        delayedDays = delayDuration;
    }

    function claimWill() public {
        require(executionType == 0);
        require(beneficiaries[msg.sender].isExercised == false);
        emit distributed(msg.sender, "beneficiary claimed the will");

        sendPayment(msg.sender);
    }

    function executeWill() public {
        require(executionType == 1);
        require(msg.sender == executor);
        emit distributed(msg.sender, "executor executed the will");

        for (uint i = 0; i < address_array.length; i++){
            if (!beneficiaries[address_array[i]].isExercised){
                sendPayment(address_array[i]);
            }
        }
    }

    function executeWill(address ben_address) public payable restricted {
        // make sure the will hasn't been executed yet
        // require(beneficiaries[ben_address].isExercised == false);
        
        // address payable ben_address_pay = address(uint160(ben_address));
        // ben_address_pay.transfer(address(this).balance);
        // beneficiaries[ben_address].isExercised = true;
        sendPayment(ben_address);
    }

    function sendPayment(address ben_address) internal {  
        address payable ben_address_pay = address(uint160(ben_address));
        ben_address_pay.transfer(address(this).balance);
        beneficiaries[ben_address].isExercised = true;
    }

    function getAddresses() public view returns (address[] memory) {
        return address_array;
    }

    function resetContract() public restricted {
        delete address_array;
    }

    function voidContract() public restricted {
        // delete the contract and send remaining balance back to owner
        selfdestruct(owner);
    }
}   