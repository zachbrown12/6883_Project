import React from 'react';
// import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Assets = (props) => {
    var myAddress = props.cur_address
    var isBeneficiary = false;
    var isExecutor = props.executor === myAddress;

    props.beneficiaries.map((beneficiaries) => {
        if (isBeneficiary === false) {
            isBeneficiary = beneficiaries.ben_address === myAddress;
        }
    });

    return (
        <div className="assets">
            <div className="card text-dark bg-light mb-2">
                <h2>Current Will's Information</h2>
                <ListGroup>
                    <ListGroup.Item>Contract Address: {"0x126d84BF66F8b3018DA6B575d9cD5Fb1228150F6"} </ListGroup.Item>
                    <ListGroup.Item>Testator Address: {props.owner} </ListGroup.Item>
                    <ListGroup.Item>Payout for this will: {props.total_payout} Wei </ListGroup.Item>
                </ ListGroup>
            </div>
            
            <div className="card text-dark bg-light mb-2">
                <h2>My Account's Information</h2>
                <ListGroup>
                    <ListGroup.Item>My Account Address: {myAddress}</ListGroup.Item>
                    <ListGroup.Item>
                        My Role: {(props.owner === myAddress) ? "Owner" : 
                            (isBeneficiary === true) ? "Beneficiary" :
                            (isExecutor === true) ? "Executor" : "None"} 
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
};

export default Assets