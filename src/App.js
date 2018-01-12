import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './styles/app.less'

import HomePage from './views/HomePage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={HomePage}/>
      </BrowserRouter>
    )
  }
}
