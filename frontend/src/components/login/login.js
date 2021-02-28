import React from 'react';
import { Form, Input, Button, message,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../../axios-user";
import { withRouter } from "react-router-dom";
import "./login.css";

class NormalLoginForm extends React.Component{
    onFinish = (values) => {
    console.log('Received values of form: ', values);

  
  };
  constructor(props) {
    super(props);
  this.state={
    username:{
      value:""
    },
    password:{
      value:""
    }
  }}

login= data =>{

    axios.post('/api/users/login',data).then( res=>{
      if (res.data.token!=null){
        const token=res.data.token;
        const role=res.data.role;
        localStorage.setItem("jwtToken",token);
        localStorage.setItem("role",role);
        
        console.log(res);
        this.props.history.push("/ViewRequests" );
      }
      else {
        message.error(res.data.message);
      }
      
      }).catch(err=>{
        console.log(err.errors)
    })

}
  


  onChangeHandler = (event,stateIdentifier )=>{
    const cloneState ={
      ...this.state
    };
    const deepClone={
    ...cloneState[stateIdentifier]
    };

    deepClone.value=event.target.value;
    this.setState({[stateIdentifier]:deepClone},()=>{
      console.log(this.state)
    })
  }

render(){
 
  return (
    <Card className='login-card' style={{width:350,height:300}}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.login}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input onChange={(event)=> this.onChangeHandler(event,"username") }
         prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input  onChange={(event)=> this.onChangeHandler(event,"password") }
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
       
      </Form.Item>
    </Form>
    </Card>
  );}
};

export default withRouter(NormalLoginForm) ;