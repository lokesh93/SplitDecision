import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from '../views/login.jsx';
import CreateGroup from '../views/creategroup.jsx';
import Home from '../views/home.jsx';


class Routes extends Component {
  render() {
    console.log("gogogo")
    return (
          <div id="go">
            <Router>
                <Route path='/new' component={CreateGroup} exact/>
                <Route path='/group/:id' component={Home}/>
                {/* <Route path='/group/:id' component={Home}/> */}
            </Router>
          </div>

    );
  }
}

export default hot(module) (Routes);