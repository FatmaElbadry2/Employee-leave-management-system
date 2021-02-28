import {
  Layout,
  Modal,
  DatePicker,
  Tree,
  Select,
  Space,
  List,
  Card,
  Typography,
  message,
  Button,
  Form,
  Input,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import React from "react";
import PageHeader from "../pageHeader/pageHeader";
import axios from "../../axios-user";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./view.css";
const { Content, Sider, Footer } = Layout;
const { Option } = Select;
const { Text } = Typography;

class ViewRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      employees: [],
      role: localStorage.getItem("role"),
      filters: {
        status: ["pending"],
        startdate: Date.now(),
        enddate: null,
        reason: [],
        employee: [],
      },
      newReuqest: {
        reason: "",
        daterange: [],
        additionaldetails: "",
      },
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChangeHandler = (event, stateIdentifier) => {
    const cloneState = {
      ...this.state,
    };
    const deepClone = {
      ...cloneState[stateIdentifier],
    };
    try {
      deepClone = event.target.value;
    } catch {
      deepClone = event.value;
    }
    this.setState({ [stateIdentifier]: deepClone }, () => {
      console.log(this.state);
    });
  };

  createrequest = () => {
    const token = localStorage.getItem("jwtToken");
    const request = {
      reason: this.state.newReuqest.reason,
      additionaldetails: this.state.newReuqest.additionaldetails,
      startdate: this.state.newReuqest.daterange[0].format("YYYY-MM-DD"),
      enddate: this.state.newReuqest.daterange[1].format("YYYY-MM-DD"),
    };
    console.log(request);
    axios
      .post("/api/requests/createrequest", request, {
        headers: { Authorization: "JWT " + token },
      })
      .then((res) => {
        if (res.message == null) {
          message.success("Your Request Is Added Successfully !");
          this.handleCancel();
        } else {
          message.error(" Not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  OnchangeRequest = (event, stateIdentifier, text) => {
    console.log(event);
    const cloneState = {
      ...this.state.newReuqest,
    };
    let deepClone = {
      ...cloneState,
    };
    if (text) {
      deepClone[stateIdentifier] = event.target.value;
    } else {
      deepClone[stateIdentifier] = event;
    }

    console.log(deepClone);
    this.setState({ newReuqest: deepClone }, () => {
      console.log(this.state.newReuqest);
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role");
    console.log(role);
    const request = {
      status: ["pending"],
    };
    if (role === "manager") {
      axios
        .get("/api/users/getmyemployees", {
          headers: { Authorization: "JWT " + token },
        })
        .then((data) => {
          const e = data.data.map((a) => a.username);
          this.setState({ employees: e });
          console.log(this.state.employees);
        })
        .catch((err) => {
          message.error(err.message);
        });
      axios
        .post("/api/requests/viewemprequest", request, {
          headers: { Authorization: "JWT " + token },
        })
        .then((res) => {
          if (res.message == null) {
            this.setState({ data: res.data });
          } else {
            message.error(" Not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/api/requests/viewmyrequest", request, {
          headers: { Authorization: "JWT " + token },
        })
        .then((res) => {
          if (res.message == null) {
            this.setState({ data: res.data });
          } else {
            message.error(" Not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  render() {
    const status = [
      {
        title: "Status",
        key: "all",
        children: [
          {
            title: "Pending",
            key: "pending",
          },
          {
            title: "Accepted",
            key: "accepted",
          },
          {
            title: "Rejected",
            key: "rejected",
          },
        ],
      },
    ];

    const reasons = [
      {
        title: "Reason",
        key: "all",
        children: [
          {
            title: "Casual Leave",
            key: "casual leave",
          },
          {
            title: "Medical Leave",
            key: "medical leave",
          },
          {
            title: "Maternity/Paternity Leave",
            key: "maternity leave",
          },
          {
            title: "Holiday",
            key: "holiday",
          },
        ],
      },
    ];

    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader landing={true} history={this.props.history} />
        </div>
        <Layout className="site-layout-background">
          <Layout>
            <Sider
              className="site-layout-background"
              width={"18%"}
              style={{
                overflow: "auto",
                height: "100vh",
                background: "#fff",
                left: 0,
              }}
            >
              <Space direction="vertical">
                {this.state.role === "manager" ? (
                  <Select
                    //value={this.state.manager.value}
                    // onChange={(event) => this.onChangeHandler(event, "manager")}
                    showSearch
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Choose Employee"
                    optionFilterProp="name"
                    optionLabelProp="name"
                  >
                    {this.state.employees.map((item) => (
                      <Option key={item} value={item} label={item}>
                        <div>{item}</div>
                      </Option>
                    ))}
                  </Select>
                ) : null}

                <div className="date-range" style={{ width: "100%" }}>
                  <DatePicker.RangePicker />
                </div>

                <Tree
                  checkable
                  defaultExpandedKeys={["all"]}
                  defaultCheckedKeys={["pending"]}
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                  treeData={status}
                />

                <Tree
                  checkable
                  defaultExpandedKeys={["all"]}
                  defaultCheckedKeys={["all"]}
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                  treeData={reasons}
                />

                <Button type="primary">Apply Filters</Button>
              </Space>
            </Sider>

            <Layout style={{}}>
              <Content
                className="site-layout-background"
                style={{
                  minHeight: "90vh",
                }}
              >
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={this.state.data}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        title={
                          this.state.role === "manager"
                            ? item.User.username
                            : item.startdate
                        }
                      >
                        <Text strong>Leave Type: {item.reason} </Text>
                        <Text strong>From: {item.startdate} </Text>
                        <Text strong>To: {item.enddate} </Text>
                        <Text strong>
                          Additional Details: {item.additionaldetails}{" "}
                        </Text>
                        <Text strong>Status: {item.status} </Text>
                      </Card>
                    </List.Item>
                  )}
                />
                <Modal
                  visible={this.state.visible}
                  title="Create A New Request"
                  onOk={this.createrequest}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="Cancel" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="Add"
                      type="primary"
                      onClick={this.createrequest}
                    >
                      Create
                    </Button>,
                  ]}
                >
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={this.createrequest}
                    // initialValues={{ size: componentSize }}
                    // onValuesChange={onFormLayoutChange}
                  >
                    <Form.Item   name="reason"  rules={[
              {
                required: true,
                message: "Please choose your leave reason !",
              },
            ]} label="Reason">
                      <Select
                        onSelect={(event) =>
                          this.OnchangeRequest(event, "reason", false)
                        }
                      >
                        <Option value="casual leave">Casual Leave</Option>
                        <Option value="medical leave">Medical Leave</Option>
                        <Option value="maternity leave">
                          Maternity/Paternity Leave
                        </Option>
                        <Option value="holiday">Holiday</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item  name="leave range" label="From - To"     rules={[
              {
                required: true,
                message: "Please Specify the leave range !",
              },
            ]}>
                      <DatePicker.RangePicker
                        value={this.state.newReuqest.daterange}
                        onChange={(event) =>
                          this.OnchangeRequest(event, "daterange", false)
                        }
                      />
                    </Form.Item>

                    <Form.Item  label="Details">
                      <Input.TextArea
                        onChange={(event) =>
                          this.OnchangeRequest(event, "additionaldetails", true)
                        }
                        value={this.state.newReuqest.additionaldetails}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </Content>
            </Layout>
            {this.state.role==="employee"? <Footer
              style={{
                position: "fixed",
                background: "#fff",
                bottom: 0,
                right: 0,
              }}
            >
              <Button
                onClick={this.showModal}
                style={{ marginLeft: "90%", marginBottom: 0 }}
                type="primary"
                shape="circle"
                size={"large"}
                icon={<PlusCircleFilled />}
              />
            </Footer>:null}
            
          </Layout>
        </Layout>
      </>
    );
  }
}
export default withRouter(ViewRequests);
