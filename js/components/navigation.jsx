import React, { Component } from 'react';
import { Navbar, Nav, FormControl, Form, Button, NavDropdown } from 'react-bootstrap';

class Navigation extends Component {



    constructor(props) {
        super(props);
    }

    render() {

        let {usernames} = this.props;
        let selectCurrentUser = (usernames && usernames.length > 0 ? (<select onChange={this.props.setCurrentGroupMember.bind(this)} className="select-current-user">
                                    {usernames.map(u => <option value={u}>{u}</option>)}
                                </select>) : null); 

        return (
            <nav className="main-nav">
              <div className="logoBtn row">
                <div className="logo col-xs-9">
                    <a href="#">
                      <h1>SplitDecision</h1>
                    </a>
                </div>
                <ul className="col-xs-3 row" style={{alignItems: "center"}}>
                    <li className="col-xs-3"></li>
                    <li className="col-xs-3"></li>
                    <li className="col-xs-3"></li>
                    <li className="col-xs-3">
                      {selectCurrentUser}
                    </li>
                </ul>
              </div>
    

    
          </nav> 
        );
    }
}

export default Navigation;