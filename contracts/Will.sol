pragma solidity >=0.4.22 <0.9.0;

contract Will {
    struct Beneficiary {
        string name;
        uint payout;
        address ben_address;
    }

    address public owner;
    address[] public address_array;
    mapping(address => Beneficiary) public beneficiaries;
    bool isExercised;

    constructor() public {
        owner = msg.sender;
        isExercised = false;
        //msg.data, msg.sender, msg.value. msg.gas are options
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    modifier restrictedWill() {
        require(msg.sender == owner && isExercised == false);
        _;
    }
    
    function addBeneficiary(string memory name, address ben_address) public restricted {
        Beneficiary memory newBeneficiary = Beneficiary({
            name: name,
            payout: 0,
            ben_address: ben_address
        });

        beneficiaries[ben_address] = newBeneficiary;
        address_array.push(ben_address);
    }

    function updatePayout(address ben_address, uint payout) public restricted {

        Beneficiary storage ben_update = beneficiaries[ben_address];
        ben_update.payout = payout;
    }

    function executeWill(address ben_address) public payable restrictedWill {
        //isExercised = true;

        address payable ben_address_pay = address(uint160(ben_address));
        Beneficiary storage cur_ben = beneficiaries[ben_address];
        ben_address_pay.transfer(address(this).balance);
    }


    function getAddresses() public view returns (address[] memory) {
        return address_array;
    }

}   