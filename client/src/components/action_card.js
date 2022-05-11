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
                        <h4>{(this.props.beneficiary.isExercised) ? "Executed Will" : "Deployed Will"}</h4>
                        Name: {this.props.beneficiary.name}<br></br>
                        Address: {this.props.beneficiary.ben_address}<br></br>
                        Payout: {this.props.beneficiary.payout} Wei<br></br>

                        <Form onSubmit ={(event) => this.executeWill(event)}>
                            {(this.props.beneficiary.isExercised) ? "" : 
                                (this.props.beneficiary.ben_address === this.props.cur_address) ? <Button variant="outline-success" size="sm" type="submit">Claim Will</Button> : 
                                (this.props.executor === this.props.cur_address) ? <Button variant="outline-success" size="sm" type="submit">Execute Will</Button> : ""} 
                        </Form>

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
        const payout = event.target[0].value
        console.log(payout);
        const address = this.props.beneficiary.ben_address

        await this.props.contract.methods.updatePayout(address, payout).sendBlock({
            from: this.props.owner,
            password: userData["password"],
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',
        })

        this.props.updatePayout(payout);
    }

    executeWill = async (event) => {
        event.preventDefault()
        
        if (this.props.executor === this.props.cur_address){
            console.log("start executing the will")
            await this.props.contract.methods.executeWill().sendBlock({
                from: this.props.cur_address,
                password: userData["password"],
                amount: '0',
                gas_price: '20000000000',
                gas:'2000000',
            })
        } else if (this.props.beneficiary.ben_address === this.props.cur_address){
            console.log("start claiming the will")
            await this.props.contract.methods.claimWill().sendBlock({
                from: this.props.cur_address,
                password: userData["password"],
                amount: '0',
                gas_price: '20000000000',
                gas:'2000000',
            })
        } else {
            // no actions
        }
    }
}

export default ActionCard