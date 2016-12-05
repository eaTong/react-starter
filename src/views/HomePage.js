/**
 * Created by eatong on 16-12-5.
 */
import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

  render() {
    return (
      <div className="home-page">
        try to change something here and watch what happened with your website
        <h2>hmr????</h2>
        <h4><Link to="/task">task</Link></h4>
      </div>
    );
  }
}
export default HomePage;
