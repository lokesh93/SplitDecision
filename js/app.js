import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './views/home.jsx';
import Routes from './views/routes.js';

const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
const element2 = <Home testText={"heyyheyheye"}/>;
const elem2 = <Routes />

const render = (elem) => {
  ReactDOM.render(
    <AppContainer>{elem}</AppContainer>,
    document.getElementById('app')
  );
};

render(elem2);


if (module.hot) {
  module.hot.accept('./views/routes.js', () => {
    const Routes = require('./views/routes.js');
    render(<Routes />);
  })
}

