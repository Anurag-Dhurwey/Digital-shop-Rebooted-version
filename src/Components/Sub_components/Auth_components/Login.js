import {
  Modal,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Context/AuthContext";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { setToken } from "../../../Context/Mini_fuctions/AuthToken";
import { ForgotPassword } from "../../../Context/Mini_fuctions/ForgotPassword";

const Login = () => {
  const API = `${process.env.REACT_APP_DATAURL}`;
  const navigate = useNavigate();

  const { user, setUser } = useAuthContext();
  const { enabled } = useGlobleContext();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const sendForgotPassword = async (values) => {
    setIsLoading(true);
    try {
      const forgotPass = await ForgotPassword(values.email);
      if (forgotPass.ok === true) {
        setForgotEmailSent(true);
      } else {
        message.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setForgotEmailSent(false);
  };

  const sendEmailConfirmation = async (email) => {
    try {
      console.log("sending email verifi");
      const response = await fetch(
        `${API}${process.env.REACT_APP_SEND_EMAIL_CONFIRMATION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response?.error) {
        throw response?.error;
      } else {
        message.success(`A verification mail is sent to ${email}!`);
      }
    } catch (error) {
      message.error(`Can not sent verification email to ${email}!`);
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(
        `${API}${process.env.REACT_APP_LOGIN_USER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await response.json();
      if (data?.error) {
        if (data.error.message === "Your account email is not confirmed") {
          sendEmailConfirmation(values.email);
        }
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);
        console.log(data);

        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.log("catch error");
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      console.log("no login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="mb-auto">
        {!user ? (
          <>
            <Fragment>
              <Row align="middle" className="justify-center">
                <Col className="w-[300px] md:w-[400px] lg:w-[500px] ">
                  <Card
                    title="LogIn"
                    className={`${enabled ? "bg-slate-700" : "bg-slate-300"}`}
                  >
                    {error ? (
                      <Alert
                        className="alert_error"
                        message={error}
                        type="error"
                        closable
                        afterClose={() => setError("")}
                      />
                    ) : null}
                    <Form
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                          },
                        ]}
                      >
                        <Input placeholder="Email address" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true }]}
                      >
                        <Input.Password
                          placeholder="Password"
                          autoComplete="off"
                        />
                      </Form.Item>

                      <Form.Item>
                        <div className="flex justify-between">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login_submit_btn text-blue-600 border-2 border-blue-600"
                          >
                            Login {isLoading && <Spin size="small" />}
                          </Button>
                          <Typography.Paragraph className="form_help_text">
                            <Link onClick={forgotPassword}>
                              Forgot password
                            </Link>
                          </Typography.Paragraph>
                        </div>
                      </Form.Item>
                    </Form>
                    <Typography.Paragraph className="form_help_text">
                      New to Digital Shop? <Link to="/register">Register</Link>
                    </Typography.Paragraph>
                  </Card>
                </Col>
              </Row>
            </Fragment>
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        {/* this modal will open when user will click on forgot password button  */}
        <Modal
          className="text-center text-black"
          title={`${
            !forgotEmailSent ? "Enter your registered email" : "Email sent"
          }`}
          open={isModalOpen}
          onOk={handleOk}
          footer={[
            <Button
              key="submit"
              className="bg-blue-700"
              type="primary"
              onClick={handleOk}
            >
              ok
            </Button>,
          ]}
        >
          {forgotEmailSent && (
            <p>We have sent an password reset link to your registered email </p>
          )}
          {!forgotEmailSent && (
            <Form onFinish={sendForgotPassword}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email address" required />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn text-blue-600 border-2 border-blue-600"
                >
                  Submit {isLoading && <Spin className="pl-2" size="small" />}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Login;
