import React, { Component } from 'react';
import Navigation from '../components/navigation.jsx';
import axios from 'axios';


class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            members: [
                {name: ""}
            ]
        }
    }



    render() {


        return (
            <div>
                <Navigation />
                <div className="create-group-form">
                    <div className="create-group-form-container">
                        <div className="create-group-form-header">
                            <h3>About</h3>
                        </div>

                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGroup;