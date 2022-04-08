import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Assets = (props) => {

    return (
        <div className="assets">
            <h3>Here are your Assets</h3>
            <div className = "bullets">
                <ListGroup>
                    <ListGroup.Item>NFT 1</ListGroup.Item>
                    <ListGroup.Item>NFT 2</ListGroup.Item>
                    <ListGroup.Item>NFT 3</ListGroup.Item>
                </ ListGroup>
            </div>
        </div>
    )
};

export default Assets