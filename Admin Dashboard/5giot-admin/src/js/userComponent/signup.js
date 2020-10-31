import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MaskedInput from "react-text-mask";
import line190 from "../../images/login-bg/Line-190.png";
import line191 from "../../images/login-bg/Line-191.png";
import "../../styles/login.css";
export default function Signup() {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState({ isError: false, message: "" });
  let history = useHistory();
  function initUser() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      contactNumber: "",
      address: "",
      role: "admin",
    };
  }

  const [signup] = useMutation(gql`
    mutation addUser(
      $userName: String!
      $password: String!
      $email: String!
      $firstName: String!
      $lastName: String!
      $contactNumber: String!
      $address: String!
      $role: String!
    ) {
      addUser(
        userName: $userName
        password: $password
        firstName: $firstName
        lastName: $lastName
        email: $email
        contactNumber: $contactNumber
        address: $address
        role: $role
      ) {
        code
        isError
        message
      }
    }
  `);
  function validateForm() {
    return (
      user.userName.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0 &&
      user.contactNumber.length > 0 &&
      user.address.length > 0 &&
      user.firstName.length > 0 &&
      user.lastName.length > 0
    );
  }
  async function submitUser(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log("Going to post user from FRONTEND:", user);
    if (!validateForm()) {
      setError({ isError: true, message: "All fields are required" });
      return;
    }

    const { data, error } = await signup({
      variables: user,
    });
    console.log(error);
    console.log(data);
    if (data) {
      history.push("/");
    } else {
      setError({ isError: true, message: "username already exist" });
      setUser(initUser);
    }
  }
  function gotoLogin() {
    history.push("/");
  }
  return (
    <div className="login-cover login-bg overflow-scroll ">
      <Container>
        <Row style={{ marginLeft: "-72px" }}>
          <Col className="left-panel hidden-xs hidden-sm" md="8">
            <div className="banner-text"></div>
          </Col>
          <Col md={4} className="right-panel">
            <div className="login-content col-lg-11 offset-lg-1">
              <div className="form-group" style={{ marginTop: "120px" }}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 login-heading-btn">
                  <img className="col-sm-3 -padding" src={line190} alt="" />
                  <span
                    style={{
                      color: "#00ffcb",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Register User
                  </span>
                  <img className="col-sm-3 -padding" src={line191} alt="" />
                </div>
                <Form className="mt-40 margin-bottom-0">
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextUser"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtUsername"
                        type="text"
                        placeholder="Username"
                        className="text-input"
                        value={user.userName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, userName: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtEMail"
                        type="email"
                        placeholder="Email"
                        className="text-input"
                        value={user.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, email: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPassword"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtPassword"
                        type="password"
                        className="text-input"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, password: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextName"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtFirstname"
                        type="text"
                        className="text-input"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return {
                              ...prevState,
                              firstName:
                                val.charAt(0).toUpperCase() + val.slice(1),
                            };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextLName"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtLastname"
                        type="text"
                        className="text-input"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return {
                              ...prevState,
                              lastName:
                                val.charAt(0).toUpperCase() + val.slice(1),
                            };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextContact"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <MaskedInput
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        id="txtcontact"
                        type="text"
                        className="text-input"
                        placeholder="Contact"
                        value={user.contactNumber}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, contactNumber: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextAddress"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtFirstname"
                        type="text"
                        className="text-input"
                        placeholder="Address"
                        value={user.address}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, address: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="submit">
                    <Col sm="12">
                      <div className="login-buttons">
                        <Button
                          className="btn btn-block btn-success btn-lg login-btn"
                          type="submit"
                          onClick={submitUser}
                        >
                          Signup
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
                    <Col sm="12" className="template">
                      Already have Account?{" "}
                      <Button
                        variant="link"
                        style={{ paddingLeft: "0 !important" }}
                        onClick={gotoLogin}
                      >
                        Login Here
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
