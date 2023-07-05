import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import server from "./server";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);
  return (
    <div
      align="center"
      style={{
        marginTop: "2rem",
        padding: "2rem",
      }}
    >
      <h1>Login</h1>
      <Form
        style={{
          textAlign: "left",
        }}
      >
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          ></Form.Control>
        </Form.Group>
      </Form>
      <Button
        onClick={() => {
          server({
            url: "login",
            method: "POST",
            data: {
              username,
              password,
            },
          })
            .then(({ data }) => {
              localStorage.setItem("access_token", data.access_token);
            })
            .catch((err) => {
              console.log(err.response.data);
            })
            .then(() => {
              navigate("/");
            });
        }}
        style={{
          marginTop: "2rem",
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
