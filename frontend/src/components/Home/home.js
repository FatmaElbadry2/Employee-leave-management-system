import React from 'react';
import b1 from '../../assets/b1.jpg';
import './home.css';
import { Row, Col,Divider  } from 'antd';
import NormalLoginForm from "../login/login";

class Home extends React.Component {
  render() {

    return (
      <React.Fragment>

    <header>
  <h1> Manage Leave Requests At Ease</h1>
  <p> We provide you with a user friendly employee leave management system. You can navigate through your employees' requests, accept or reject them.</p>
</header>


      
      </React.Fragment>
    );
  }
}

export default Home;