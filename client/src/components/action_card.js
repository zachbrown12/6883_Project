import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Input } from "semantic-ui-react";

class ActionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            payout: 0
        }
    }

    render() {
  
        return (
            <div className="card-ac">
                <div key={this.props.index} class="card text-dark bg-light mb-3">
                    Name: {this.props.beneficiary.name}<br></br>
                    Address: {this.props.beneficiary.ben_address}<br></br>
                    Payout: {this.props.beneficiary.payout}<br></br><br></br>
                    <b>Choose to Give Assets</b>
                    <div className = "bullets">
                        <Form onSubmit ={(event) => this.updatePayout(event)}>
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1" type="submit">
                                    Submit
                                </Button>
                                <Form.Control 
                                    aria-label="Amount (to the nearest dollar)" />
                                <InputGroup.Text>
                                    Wei
                                </InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    };


    updatePayout = async (event) => {
        event.preventDefault()

        const payout = event.target[1].value
        const address = this.props.beneficiary.ben_address

        await this.props.contract.methods.updatePayout(address, payout).send({
            from: this.props.owner
        })

        this.props.updatePayout();
    }

}




export default ActionCard