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

    constructor() public {
        owner = msg.sender;
        //msg.data, msg.sender, msg.value. msg.gas are options
    }

    modifier restricted() {
        require(msg.sender == owner);
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

    
    /*
    function getBeneficiary(address ben_address) public view returns (Beneficiary memory) {
        return beneficiaries[ben_address];
    }
    */

    function getAddresses() public view returns (address[] memory) {
        return address_array;
    }

}   