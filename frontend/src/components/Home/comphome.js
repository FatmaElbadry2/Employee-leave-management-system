import React from 'react';
import { Tabs, Radio, Space,Row,Col,Divider } from 'antd';
import Home from '../Home/home';
import NormalLoginForm from '../login/login';
import RegisterForm from '../signup/signup';
//import NewRecipe from '../Add Recipe/newrecipe';
import './home.css';

const { TabPane } = Tabs;

class MainHome extends React.Component {
  state = {
    tabPosition: 'left',
  };

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };

  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Row>
      <Col span={15}><Home/></Col>
      <Col  span={1} ><div class="vl"></div></Col>
      <Col span={8}>
          
      <Tabs defaultActiveKey="1" centered>
    <TabPane tab="login" key="1">
    <NormalLoginForm/>
    </TabPane>
    <TabPane tab="signup" key="2">
     <RegisterForm/>
    </TabPane>

  </Tabs>
         </Col>
    </Row>
      </>
    );
  }
}

export default MainHome;