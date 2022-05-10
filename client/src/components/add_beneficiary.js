import React, { Component } from 'react';
import Select from 'react-select';
import InputGroup from 'react-bootstrap/InputGroup';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import Input from 'react-bootstrap/Input';
//import Message from 'react-bootstrap/Message';
// import ListGroup from 'react-bootstrap/ListGroup';
import { Form, Button, Message, Input } from "semantic-ui-react";

const options = [
    { value: 0, label: 'Set an execution date' },
    { value: 1, label: 'Assign an executor' },
];

const headingStyle = {
    'height': '100%',
    // 'backgroundColor': 'lightblue',
    'width': 500,
  }

class Add_Beneficiary extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            name: "",
            address: "",
            errorMessage: "",
            selectedOption: null,
            selectionValue: "",
            loading: false,
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log('Option selected:', this.state.selectedOption)
        );
    };

    render() {

    return (
        // <div className="add-b"> 
            // <h1>Smart Will</h1>
        <div className ="add-b-form" style={headingStyle}>
            <h1>Smart Will</h1>
            <h3>Add A Beneficiary</h3>
            <Form onSubmit ={this.onAddBeneficiary}>
                <Form.Field>
                    <Input
                        value={this.state.name}
                        placeholder="Enter Beneficiary Name Here"
                        onChange={(event) =>
                            this.setState({ name: event.target.value })}
                    />
                </Form.Field>

                <Form.Field>
                    <Input
                    placeholder="Enter Beneficiary Wallet Address Here"
                    value={this.state.address}
                    onChange={(event) => this.setState({ address: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />

                <InputGroup className="mb-3">
                    <Select 
                        options={options} 
                        value={this.state.selectedOption}
                        onChange={this.handleChange} 
                        placeholder="Select an option" 
                    />
                    <Input
                        placeholder="Enter Selection Value"
                        value={this.state.selectionValue}
                        onChange={(event) => this.setState({ selectionValue: event.target.value })}
                    />
                    <Button primary loading={this.state.loading}>
                        Create!
                    </Button>
                </InputGroup>
            </Form>

            <div className="card-ac">
                <Form onSubmit ={this.resetContract}>
                    {this.props.cur_address == this.props.owner ? 
                    <Button variant="danger" loading={this.state.loading}>
                        Reset the Will
                    </Button> : 
                    ""}
                </Form>
            </div>
        </div>
        );
    }

    onAddBeneficiary = async (event) => {
        event.preventDefault()

        const { name, address } = this.state
        this.setState({ loading: true, errorMessage: "" });
        console.log(name, address)
        console.log(this.props)
        console.log(this.state)
        await this.props.contract.methods.addBeneficiary(name, address).sendBlock({
            from: this.props.owner,
            password: 'mypassword',
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',
        })
        console.log(this.state)

        await this.props.contract.methods.updateExecutionType(this.state.selectedOption.value).sendBlock({
            from: this.props.owner,
            password: 'mypassword',
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',
        })
        console.log(this.state)

        if (this.state.selectedOption.value == 0){
            await this.props.contract.methods.setDate(Number(this.state.selectionValue)).sendBlock({
                from: this.props.owner,
                password: 'mypassword',
                amount: '10',
                gas_price: '20000000000',
                gas:'2000000',
            })
        } else {
            await this.props.contract.methods.setExecutor(this.state.selectionValue).sendBlock({
                from: this.props.owner,
                password: 'mypassword',
                amount: '10',
                gas_price: '20000000000',
                gas:'2000000',            
            })
        }

        this.props.createNewBen(address);
        this.setState({ loading: false });

        //this.props.contract.methods.BeneficiaryList
    }

    resetContract = async (event) => {
        event.preventDefault()

        this.setState({ loading: true, errorMessage: "" });

        await this.props.contract.methods.resetContract().sendBlock({
            from: this.props.owner,
            password: 'mypassword',
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',

        })

        this.setState({ loading: false });
    }
}

export default Add_Beneficiary;