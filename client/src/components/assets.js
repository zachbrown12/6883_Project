import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const Assets = (props) => {

    return (
        <div className="assets">
            <h2>Here are your Assets</h2>
            <div className = "bullets">
                <ListGroup>
                    <ListGroup.Item>Balance: {props.balance} wei</ListGroup.Item>
                    <ListGroup.Item>Balance: {props.web3.utils.fromWei(props.balance, "ether")} ether!</ListGroup.Item>
                    <ListGroup.Item>NFT 3</ListGroup.Item>
                </ ListGroup>
            </div>
        </div>
    )
};

export default Assets