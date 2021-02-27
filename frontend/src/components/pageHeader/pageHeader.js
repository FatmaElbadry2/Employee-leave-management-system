import React from "react";
import { PageHeader, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import NormalLoginForm from '../login/login';
import "./pageHeader.css";

class pageHeader extends React.Component {


  constructor(props) {
    super(props);
}

  nextPath = (path) => {
    this.props.history.push(path);
  };
  removetoken=()=>{
     localStorage.removeItem("jwtToken");
     this.props.history.push("/" );
  }
login=()=>{
  this.props.history.push("/NormalLoginForm" );
}

signup=()=>{
  this.props.history.push("/RegisterForm" );
}
  render() {
    return (
      <PageHeader
        ghost={false}
        title="Healthy made tasty"
        className="header"
        subTitle="Home For Your Delicious Healthy Meals"
        extra={[
          localStorage.getItem("jwtToken") === null ? 
         <div>
          <Button  color="Black"
          onClick={this.login}> Login
          </Button>  <Button  color="Black"
          onClick={this.signup}> Signup
          </Button> 
          </div>
          :   <Button  color="Black"
          onClick={this.removetoken}> Logout
          </Button> 
        ]}
      ></PageHeader>
    );
  }
}

export default withRouter(pageHeader);
