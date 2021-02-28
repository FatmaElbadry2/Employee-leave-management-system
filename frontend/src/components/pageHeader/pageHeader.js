import React from "react";
import { PageHeader, Button } from "antd";

import { withRouter } from "react-router-dom";

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

  render() {
    return (
      <PageHeader
        ghost={false}
        title="Leave Management System"
        className="header"
        subTitle="Manage leave Requests Easily"
        extra={[
          localStorage.getItem("jwtToken") === null ? 
      null
          :   <Button  color="Black"
          onClick={this.removetoken}> Logout
          </Button> 
        ]}
      ></PageHeader>
    );
  }
}

export default withRouter(pageHeader);
