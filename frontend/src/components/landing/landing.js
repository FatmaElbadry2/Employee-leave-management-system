import React from "react";
import { Image } from "antd";
import PageHeader from "../pageHeader/pageHeader";
//import Tab from "../tabs/tabs";
import Banner from "../../assets/banner.jpg";
import "./landing.css";
import MainHome from "../Home/comphome";
import ViewRequests from "../requests/view";

class Landing extends React.Component {

  render() {
    return (
      <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader landing={true} history={this.props.history}/>
        
       

      </div>
      <MainHome/>
      </>
      
    );
  }
}

export default Landing;
