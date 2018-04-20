/**
 * Created by eatong on 16-12-5.
 */
import React from 'react';
import {Link} from 'react-router';
import {Button} from 'antd';
import ajax from '../util/ajaxUtil';

class HomePage extends React.Component {

  async componentDidMount() {
    await this.getTodo();
  }

  async getTodo() {
    const {success, data} = await ajax({
      url: '/api/pub/todo/get',
    });
    console.log(success, data);
  }

  render() {
    return (
      <div className="home-page">
        <Button>test button</Button>
      </div>
    );
  }
}

export default HomePage;
