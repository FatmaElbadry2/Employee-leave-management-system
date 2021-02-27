import { List, Space, message, Divider, Typography, Image, Card, Input, Select, Slider, AutoComplete, Button } from 'antd';
import { Layout } from 'antd';


import { DeleteFilled, EditFilled } from '@ant-design/icons';
import React from 'react';
import axios from "../../axios-user";
import { withRouter } from "react-router-dom";
import Banner from '../../assets/b1.jpg';
import jwt_decode from "jwt-decode";
//import './viewall.css';
const { Option } = Select;
const Text = Typography;
const { Header, Footer, Sider, Content } = Layout;

class ViewRequests extends React.Component {

//   componentDidMount() {
//     axios.get("/api/recipes/getrecipes")
//       .then((data) => {
//         console.log(data);
//         this.setState({
//           data: data.data,
//           originalData: data.data
//         });
//       })
//       .catch((err) => {
//         message.error(err.message);
//       });

    
//     axios.get("/api/categories/getcategories",)
//       .then((data) => {
//         const cats = data.data.map(a => a.name);
//         this.setState({ cats: cats });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     axios.get("/api/ingredients/getingredients",)
//       .then((data) => {
//         const ings = data.data.map(a => a.name);
//         this.setState({ ings: ings });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   returnunit(number) {
//     var n = "";
//     switch (number) {
//       case 0:
//         n = "Gm";
//         break;
//       case 1:
//         n = "Piece";
//         break;
//       case 2:
//         n = "Liter";
//         break;
//       case 3:
//         n = "Large Spoon";
//         break;
//       case 4:
//         n = "Tea Spoon";
//         break;
//       default:
//         n = "Gm";
//     }
//     return n;
//   }

//   categoriesChange = (event) => {
//     const dataSource = this.state.filteredcats;

//     this.setState({
//       filteredcats: event,

//     }, () => {
//       console.log("after update:   ", this.state.filteredcats);

//     });
//   }


//   ingredientsChange = (event) => {
//     const dataSource = this.state.filtereding;

//     this.setState({
//       filtereding: event,

//     }, () => {
//       console.log("after update:   ", this.state.filtereding);

//     });
//   }


//   sliderChange = (event) => {

//     this.setState({
//       slider: event,

//     }, () => {
//       console.log("after update:   ", this.state.slider);

//     });

//   }
//   userChange = (event) => {
//     this.setState({
//       isUser: event,

//     }, () => {
//       console.log("after update:   ", this.state.isUser);

//     });
//   }

//   IconText = ({ icon, text }) => (
//     <Space>
//       {React.createElement(icon)}
//       {text}
//     </Space>
//   );
  render() {
    return (
        <>
        <Layout>
         
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
         
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
         
          <Layout>
            <Content>Content</Content>
            <Sider>Sider</Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
         
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>

    );
  }
}
export default withRouter(ViewRequests);