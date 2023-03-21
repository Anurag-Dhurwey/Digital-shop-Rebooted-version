import {
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
  import React, { Fragment, useState,useEffect } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../../../Context/AuthContext"; 
import { useGlobleContext } from "../../../Context/Globle_Context";
  // import { setToken } from "../../../Context/Mini_fuctions/AuthToken";
  
  const Register = () => {
    const API=`${process.env.REACT_APP_DATAURL}`
    const navigate = useNavigate();
    const {enabled}=useGlobleContext()
    const {user,setUser,setRegisterersEmail } = useAuthContext();
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API}${process.env.REACT_APP_REGISTER_USER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          setRegisterersEmail(data.user.email)
          message.success(`A verification mail is sent to ${data.user.email}!`);
          navigate("/verify-registeres-email", { replace: true });
        }
      } catch (error) {
        console.error(error);
        setError(error?.message ?? "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };
  

    useEffect(()=>{
      if(user){
        navigate('/')
      }
      // eslint-disable-next-line 
  },[])


    return (
      <>
      {!user?<>
        <Fragment>
        <Row align="middle" className="justify-center">
          <Col className={`w-[300px] md:w-[400px] lg:w-[500px] justify-center`}>
            <Card title="Register">
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
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
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
                  <Input.Password placeholder="Password" />
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                  >
                    Submit {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="form_help_text">
                Already have an account? <Link to="/login">LogIn</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
      </>:''}
      </>
    );
  };
  
  export default Register;