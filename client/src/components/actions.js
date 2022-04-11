import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class Actions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }
    }

    render() {

        return (
            <li>{this.renderRows()}</li>
        )
    }

    renderRows() {

    return this.props.beneficiaries.map((beneficiary) => {    
        return (
            <div className="actions">
                <h3>Choose to Give Assets</h3>
                <div className = "bullets">
                    <Button>
                        Hi
                    </Button>
                </div>
            </div>
        );
    });
    }

}

export default Actions