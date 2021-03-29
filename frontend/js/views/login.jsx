import React, { Component } from 'react';
import {withRouter} from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    render() {
        console.log("here 2");
        return (
            <div>
                Login
            </div>
        );
    }
}

export default withRouter(Login);