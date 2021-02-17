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


class Routes extends Component {
  render() {
    return (
          <div id="go">
            <Router>
                <Route path='/' component={Login} exact/>
                <Route path='/login' component={Login}/>
                <Route path='/creategroup' component={CreateGroup} />
            </Router>
          </div>

    );
  }
}

export default hot(module) (Routes);