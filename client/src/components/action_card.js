import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import userData from './storage.json'

class ActionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            payout: 0
        }
    }

    render() {
        if (this.props.beneficiary.payout > 0) {
            return (
                <div className="card-ac">
                    <div key={this.props.index} class="card text-dark bg-light mb-3">
                        <h4>Deployed Will</h4>
                        Name: {this.props.beneficiary.name}<br></br>
                        Address: {this.props.beneficiary.ben_address}<br></br>
                        Payout: {this.props.beneficiary.payout} Wei<br></br>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card-ac">
                    <div key={this.props.index} class="card text-dark bg-light mb-3">
                        <b>Compose A Will</b>
                        Name: {this.props.beneficiary.name}<br></br>
                        Address: {this.props.beneficiary.ben_address}<br></br>
                        <div className = "bullets">
                            <Form onSubmit ={(event) => this.updatePayout(event)}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Assign the Will's Value: </InputGroup.Text>
                                    <Form.Control 
                                        placeholder="Integer amount in Wei (e.g. 50000)"
                                        aria-label="Amount (in Wei)" 
                                    />
                                    <Button variant="success" id="button-addon1" type="submit">
                                        Submit
                                    </Button>
                                </InputGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
    };

    updatePayout = async (event) => {
        event.preventDefault()

        const payout = event.target[1].value
        console.log(payout);
        const address = this.props.beneficiary.ben_address

        console.log(userData["password"]);
        await this.props.contract.methods.updatePayout(address, payout).sendBlock({
            from: this.props.owner,
            password: userData["password"],
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',
        })

        this.props.updatePayout(payout);
    }
}

export default ActionCard