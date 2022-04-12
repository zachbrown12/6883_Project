import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

class Actions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }
    }

    render() {

        return (
            <div>
                <h2>Beneficiaries</h2>
                {this.renderRows()}
            </div>
        )
    }

    renderRows() {

    return this.props.beneficiaries.map((beneficiary, index) => {   
        return (
            <div className="card-ac">
                <div key={index} class="card text-dark bg-light mb-3">
                    Name: {beneficiary.name}<br></br>
                    Address: {beneficiary.ben_address}<br></br>
                    Payout: {beneficiary.payout}<br></br><br></br>
                    <b>Choose to Give Assets</b>
                    <div className = "bullets">
                        <InputGroup className="mb-3">
                            <Button variant="outline-secondary" id="button-addon1">
                                Submit
                            </Button>
                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>Wei</InputGroup.Text>
                        </InputGroup>
                    </div>
                </div>
            </div>
        );
    });
    }

}



export default Actions