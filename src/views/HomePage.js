/**
 * Created by eatong on 16-12-5.
 */
import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

  render() {
    return (
      <div className="home-page">
        <p className='example-line'>
          <span className="label">mainColor</span>
          <span className="display main">main color style</span>
          <button onClick={() => window.replaceStyleVariable({main: '#' + (Math.random() + '').slice(2, 8)})}>
            random color
          </button>
        </p>
        <p className='example-line'>
          <span className="label">border </span>
          <span className="display border">border : 1px solid </span>
          <button
            onClick={() => window.replaceStyleVariable({border: parseInt(Math.random() * 10) + 'px solid #345678'})}>
            random border width
          </button>
        </p>
        <p className='example-line'>
          <span className="label">background-color </span>
          <span className="display background">background </span>
          <button
            onClick={() => window.replaceStyleVariable({background: 'rgba(0,' + parseInt(Math.random() * 255) + ',0,' + Math.random() + ')'})}>
            random background
          </button>
        </p>
      </div>
    );
  }
}

export default HomePage;
