import React, { Component, useState } from 'react';
import { Navbar, Nav, FormControl, Form, Button, NavDropdown } from 'react-bootstrap';

class Navigation extends Component {



    constructor(props) {
        super(props);
    }

    render() {

      

        return (
            <nav className="main-nav">
              <div class="logoBtn row">
                <div class="logo col-xs-9">
                    <a href="#">
                      <h1>Logo</h1>
                    </a>
                </div>
                <ul class="col-xs-3 row" style={{alignItems: "center"}}>
                    <li class="col-xs-3"><a href="#">Home</a></li>
                    <li class="col-xs-3"><a href="#">Home</a></li>
                    <li class="col-xs-3"><a href="#">Home</a></li>
                    <li class="col-xs-3"><a href="#">Home</a></li>
                </ul>
              </div>
    

    
          </nav> 
        );
    }
}

export default Navigation;