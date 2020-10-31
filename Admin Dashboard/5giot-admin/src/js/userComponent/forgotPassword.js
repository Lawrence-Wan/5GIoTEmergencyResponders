import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../styles/login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });
  let history = useHistory();
  /*
  const [forgotPassword] = useMutation(gql`
    mutation Login($userName: String!, $password: String!) {
      login(userName: $userName, password: $password) {
        refreshToken
        accessToken
      }
    }
  `);*/
  function validateForm() {
    return email.length > 0 > 0;
  }
  function gotoLogin() {
    history.push("/");
  }
  function gotoSignup() {
    history.push("/signup");
  }
  async function submit(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="login-cover login-bg overflow-scroll ">
      <Container>
        <Row style={{ marginLeft: "-72px" }}>
          <Col className="left-panel hidden-xs hidden-sm" md="8">
            <div className="banner-text"></div>
          </Col>
          <Col md={4} className="right-panel">
            <Col md="12" style={{ marginTop: "120px", textAlign: "center" }}>
              <span
                style={{
                  color: "#00ffcb",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Forgot Your Passowrd?
              </span>
            </Col>
            <Row>
              <Col md="12" style={{ textAlign: "center" }}>
                <p style={{ color: "#00ffcb" }}>
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </Col>
            </Row>
            <div className="login-content col-lg-11 offset-lg-1">
              <div className="form-group">
                <Form className="mt-40 margin-bottom-0">
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtUsername"
                        type="text"
                        placeholder="Username"
                        className="text-input"
                        value={email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEmail(val);
                        }}
                      />
                      <span className="text-input-span">
                        <i>
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "#00ffcb" }}
                          />
                        </i>
                      </span>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="submit">
                    <Col sm="12">
                      <div className="login-buttons">
                        <Button
                          className="btn btn-block btn-success btn-lg login-btn"
                          type="submit"
                          disabled={!validateForm()}
                          onClick={submit}
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="error message">
                    <Col sm="12">
                      <div
                        className={
                          error.isError ? "alert alert-danger" : "hidden"
                        }
                        role="alert"
                      >
                        {error.message}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="signup">
                    <Col
                      sm="12"
                      className="template"
                      style={{ textAlign: "center" }}
                    >
                      Already have Account?{" "}
                      <Button variant="link" onClick={gotoLogin}>
                        Login Here
                      </Button>
                    </Col>
                    <Col
                      sm="12"
                      className="template"
                      style={{ textAlign: "center" }}
                    >
                      <Button variant="link" onClick={gotoSignup}>
                        Register Here
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
