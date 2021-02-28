import React from "react";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Radio,
  Typography,
  Select,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "../../axios-user";
import { withRouter } from "react-router-dom";
import "../signup/signup.css";
const { Text } = Typography;
const { Option } = Select;

class RegisterForm extends React.Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
      },
      password: {
        value: "",
      },
      email: {
        value: "",
      },
      role: {
        value: "employee",
      },
      manager: {
        value: "",
      },
      managers: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/users/getmanagers")
      .then((data) => {
        const m = data.data.map((a) => a.username);
        this.setState({ managers: m });
        console.log(this.state.managers);
      })
      .catch((err) => {
        console.log(err);

        //message.error(err.response.data.msg);
      });
  }

  register = (data) => {
    data.role=this.state.role.value;
    console.log(data)
    axios
      .post("/api/users/register", data)
      .then((res) => {
        if (res.data.errors == null) {
          console.log(res.data);

          axios
            .post("/api/users/login", data)
            .then((res) => {
              if (res.data.token != null) {
                const token = res.data.token;
                localStorage.setItem("jwtToken", token);

                console.log(res);
                this.props.history.push("/ViewRequests");
              } else {
                message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err.errors);
            });
        } else {
          message.error(res.data.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err.errors);
      });
  };

  onChangeHandler = (event, stateIdentifier) => {
    const cloneState = {
      ...this.state,
    };
    const deepClone = {
      ...cloneState[stateIdentifier],
    };
    try {
      deepClone.value = event.target.value;
    } catch {
      deepClone.value = event.value;
    }
    this.setState({ [stateIdentifier]: deepClone }, () => {
      console.log(this.state);
    });
  };


  
  render() {
    return (
      <Card className="signup-card" style={{ width: 350, height: 500 }}>
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
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              onChange={(event) => this.onChangeHandler(event, "email")}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="e-mail"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              onChange={(event) => this.onChangeHandler(event, "username")}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item name="role">
            <Text>Role: </Text>
            <Radio.Group
              onChange={(event) => this.onChangeHandler(event, "role")}
              defaultValue="employee"
              value={this.state.role.value}
            >
              <Radio value="employee">Employee</Radio>
              <Radio value="manager">Manager</Radio>
            </Radio.Group>
          </Form.Item>

          {this.state.role.value === "employee" ? (
            <Form.Item name="manager">
              <Select
                prefix={<UserOutlined className="site-form-item-icon" />}
                value={this.state.manager.value}
                onChange={(event) => this.onChangeHandler(event, "manager")}
                showSearch
                style={{ width: 200 }}
                placeholder="Choose Manager"
                optionFilterProp="name"
                optionLabelProp="name"
              >
                {this.state.managers.map((item) => (
                  <Option key={item} value={item} label={item}>
                    <div>{item}</div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : null}

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              onChange={(event) => this.onChangeHandler(event, "password")}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default withRouter(RegisterForm);
