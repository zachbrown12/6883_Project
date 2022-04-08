import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


class BeneficiaryList extends Component {
    constructor(props) {
        super(props);

        this.state = { term: 'Input Value Here'};
    }

    render() {

    return (
        <div className="beneficiary-list"> 
         <h1>Beneficiary List</h1>
         <ListGroup className="b-list">
                    <ListGroup.Item>Joe</ListGroup.Item>
                    <ListGroup.Item>Zach</ListGroup.Item>
                    <ListGroup.Item>Mary</ListGroup.Item>
                </ ListGroup>
            <br></br><br></br>
                <Form>
                    <Form.Group className="add-b">
                    <Form.Control type="text" placeholder="Input Wallet Address" />
                    <Form.Label><Button> Add Beneficiary </Button> </Form.Label>
                    </Form.Group>
                </Form>
            <br></br>
        </div>
        );
    }

    onInputChange(term) {
        this.setState({term})
        this.props.onTermChange(term)
    }
}

export default BeneficiaryList;