/**
 * Created by 7wingsfish on 2016/4/2.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';


import App from './views/App';
import HomePage from './views/HomePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);
