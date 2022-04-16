import React, { Component } from 'react';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import Input from 'react-bootstrap/Input';
//import Message from 'react-bootstrap/Message';
import ListGroup from 'react-bootstrap/ListGroup';
import { Form, Button, Message, Input } from "semantic-ui-react";


class Add_Beneficiary extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            name: "",
            address: "",
            errorMessage: "",
            loading: false,
        };
    }

    render() {

    return (
        <div className="add-b"> 
         <h1>Smart Will</h1>
        <div className ="add-b-form">
            <h3>Add Beneficiary</h3>
            <Form onSubmit ={this.onAddBeneficiary}>
                <Form.Group >
                <Form.Field>
                    <label>Name</label>
                    <Input
                    value={this.state.name}
                    onChange={(event) =>
                        this.setState({ name: event.target.value })
                    }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Wallet Address</label>
                    <Input
                    value={this.state.address}
                    onChange={(event) => this.setState({ address: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Create!
                </Button>
                </Form.Group>
            </Form>
        </div>
            <br></br>
        </div>
        );
    }

    onAddBeneficiary = async (event) => {
        event.preventDefault()

        const { name, address } = this.state
        this.setState({ loading: true, errorMessage: "" });

        await this.props.contract.methods.addBeneficiary(name, address).send({
            from: this.props.owner
        })

        this.props.createNewBen(address);
        this.setState({ loading: false });

        //this.props.contract.methods.BeneficiaryList
    }
}

export default Add_Beneficiary;