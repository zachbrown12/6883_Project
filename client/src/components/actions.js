import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import ActionCard from '../components/action_card';

class Actions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
    }

    render() {

        return this.props.beneficiaries.map((beneficiaries, index) => {
            return (
                <ActionCard
                    owner = {this.props.owner}
                    key = {index}
                    contract = {this.props.contract}
                    beneficiary = {beneficiaries}
                    updatePayout = {this.props.updatePayout}
                />
            );
    });

    }

}


export default Actions