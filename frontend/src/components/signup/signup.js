import React from 'react';
import { Form, Input, Button, message,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../../axios-user";
import { withRouter } from "react-router-dom";


class RegisterForm extends React.Component{
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
    },
      email:{
        value:""
      }
    
  }}

register= data =>{
  const user = {
    username:this.state.username,
    password:this.state.password,
    email:this.state.email
  };
    axios.post('/api/user/register',data).then( res=>{
      if (res.data.errors==null){
        console.log(res)
        
        axios.post('/api/user/login',data).then( res=>{
          if (res.data.token!=null){
            const token=res.data.token;
            localStorage.setItem("jwtToken",token);
            
            
            console.log(res);
            this.props.history.push("/viewRecipes" )
          }
          else {
            message.error(res.data.message);
          }
          
          }).catch(err=>{
            console.log(err.errors)
        })
      }
      else {
        message.error(res.data.errors[0].message);
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
    <Card style={{width:350}}>
    <Form
      name="normal_register"
      className="register-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.register}
    >

<Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input onChange={(event)=> this.onChangeHandler(event,"email") }
         prefix={<UserOutlined className="site-form-item-icon" />} placeholder="e-mail" />
      </Form.Item>

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
          Register
        </Button>
       
      </Form.Item>
    </Form>
    </Card>
  );}
};

export default withRouter(RegisterForm) ;