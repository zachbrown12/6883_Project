import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const Assets = (props) => {

    return (
        <div className="assets">
            <div class="card text-dark bg-light mb-2">
                <h2>My Account Information</h2>
                <ListGroup>
                    <ListGroup.Item>Address: {props.owner} </ListGroup.Item>
                    <ListGroup.Item>Current Balance: {props.balance} Wei </ListGroup.Item>
                    {/* <ListGroup.Item>Balance: {props.web3.utils.fromWei(props.balance, "ether")} ether!</ListGroup.Item> */}
                    <ListGroup.Item>Payout for wills: {props.total_payout} Wei </ListGroup.Item>
                    <ListGroup.Item>Remaining to Allocate: {props.balance - props.total_payout} Wei </ListGroup.Item>
                </ ListGroup>
            </div>
        </div>
    )
};

export default Assets