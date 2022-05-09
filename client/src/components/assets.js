import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Assets = (props) => {
    var myAddress = props.cur_address
    var isBeneficiary = false;
    var isExecutor = props.owner == myAddress;
    // console.log(props.beneficiaries)

    props.beneficiaries.map((beneficiaries) => {
            if (isBeneficiary === false) {
                isBeneficiary = beneficiaries == myAddress;
            }    
        }
    );

    return (
        <div className="assets">
            <div class="card text-dark bg-light mb-2">
                <h2>Current Will's Information</h2>
                <ListGroup>
                    <ListGroup.Item>Contract Address: {"0x126d84BF66F8b3018DA6B575d9cD5Fb1228150F6"} </ListGroup.Item>
                    <ListGroup.Item>Testator Address: {props.owner} </ListGroup.Item>
                    {/* <ListGroup.Item>Current Balance: {props.balance} Wei </ListGroup.Item> */}
                    {/* <ListGroup.Item>Balance: {props.web3.utils.fromWei(props.balance, "ether")} ether!</ListGroup.Item> */}
                    <ListGroup.Item>Payout for this will: {props.total_payout} Wei </ListGroup.Item>
                    {/* <ListGroup.Item>Remaining to Allocate: {props.balance - props.total_payout} Wei </ListGroup.Item> */}
                </ ListGroup>
            </div>
            <br></br>
            <div class="card text-dark bg-light mb-2">
                <h2>My Account's Information</h2>
                <ListGroup>
                    <ListGroup.Item>My Account Address: {myAddress}</ListGroup.Item>
                    <ListGroup.Item>
                        My Role: {(props.owner == myAddress) ? "Owner" : 
                            (isBeneficiary == true) ? "Beneficiary" :
                            (isExecutor == true) ? "Executor" : "None"} 
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )

};

export default Assets