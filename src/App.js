import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import HomePage from './views/HomePage';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={HomePage}/>
        </Route>
      </Router>
    )
  }
}
