import React from "react";

import PageHeader from "../pageHeader/pageHeader";
//import Tab from "../tabs/tabs";

import "./landing.css";
import MainHome from "../Home/comphome";


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
