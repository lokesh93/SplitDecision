import React, { Component } from 'react';
import { Navbar, Nav, FormControl, Form, Button, NavDropdown } from 'react-bootstrap';

class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="side-bar">
                <div class="controls-container">
                    <button class="add-item">Add Item</button>
                    <button class="add-member">Add Member</button>
                </div>
            </div>
        );
    }
}

export default Navigation;