import React, { Component } from 'react';
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
                    cur_address = {this.props.cur_address}
                    key = {index}
                    contract = {this.props.contract}
                    beneficiary = {beneficiaries}
                    executor = {this.props.executor}
                    updatePayout = {this.props.updatePayout}
                />
            );
        });
    }
}

export default Actions