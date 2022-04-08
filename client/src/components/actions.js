import React from 'react';
import Button from 'react-bootstrap/Button';

const Actions = (props) => {

    return (
        <div className="actions">
            <h3>Choose to Give Assets</h3>
            <div className = "bullets">
                <Button>
                    Give NFT
                </Button>
                <br></br><br></br>
                <Button>
                    Give NFT 2
                </Button>
                <br></br><br></br>
                <Button>
                    Give NFT 3
                </Button>
            </div>
        </div>
    )
};

export default Actions