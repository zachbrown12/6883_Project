import React, { Component } from 'react';
// import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
// import { Input } from "semantic-ui-react";

// const options = [
//     { value: 0, label: 'Set an execution date' },
//     { value: 1, label: 'Assign an executor' },
// ];

class ActionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            payout: 0,
            // selectedOption: null,
            // optionValue: ""
        }
    }

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption }, () =>
    //       console.log('Option selected:', this.state.selectedOption)
    //     );
    // };

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
            // const { selectedOption } = this.state;
            return (
                <div className="card-ac">
                    <div key={this.props.index} class="card text-dark bg-light mb-3">
                        <b>Compose A Will</b>
                        Name: {this.props.beneficiary.name}<br></br>
                        Address: {this.props.beneficiary.ben_address}<br></br>
                        <div className = "bullets">
                        <Form onSubmit ={(event) => this.updatePayout(event)}>
                            {/* <InputGroup className="mb-3">
                                <Select 
                                    options={options} 
                                    value={selectedOption}
                                    onChange={this.handleChange} 
                                    placeholder="Select an option" 
                                />
                                <Form.Control 
                                    placeholder={(this.state.selectedOption == null) ? "" : 
                                        (this.state.selectedOption.value == 0) ? "Enter the desired days since Linux epoch" :
                                        (this.state.selectedOption.value == 1) ? "Enter the executor's account address" : ""}
                                    aria-label="Value with dropdown button" 
                                />
                            </InputGroup> */}

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

        await this.props.contract.methods.updatePayout(address, payout).send({
            from: this.props.owner
        })

        this.props.updatePayout(payout);
    }
}

export default ActionCard