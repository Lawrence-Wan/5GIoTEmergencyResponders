import { useMutation } from "@apollo/react-hooks";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import line190 from "../../images/login-bg/Line-190.png";
import line191 from "../../images/login-bg/Line-191.png";
import "../../styles/login.css";
import { getApolloClient } from "../apolloClient";
import AppContext from "../appContext";
import { saveTokens } from "../manageTokens";

export default function Login() {
  /* ************ State Variables Initiation *********** */
  const [user, setUser] = useState(initUser);
  const appContext = useContext(AppContext);
  const [error, setError] = useState({ isError: false, message: "" });
  let history = useHistory();
  function initUser() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      isRemember: false,
      email: "",
      contactNumber: "",
      address: "",
      password: "",
      role: "admin",
    };
  }
  /* ************ END State Variables Initiation *********** */

  /********** Apollo Queries plus Mutations ***************/
  const [login] = useMutation(gql`
    mutation Login($userName: String!, $password: String!) {
      login(userName: $userName, password: $password) {
        refreshToken
        accessToken
      }
    }
  `);

  const userByUserName = gql`
    query UserByName($userName: String!) {
      userByName(userName: $userName) {
        _id
        email
        userName
        firstName
        lastName
        contactNumber
        address
        role
        password
      }
    }
  `;

  /*************** ENd Apollo **************************** */
  /**************** Component Methods *********************** */

  function validateForm() {
    return user.userName.length > 0 && user.password.length > 0;
  }
  function registerUser() {
    history.push("signup");
  }
  function forgotPass() {
    history.push("forgotPassword");
  }

  async function submitLogin(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log(user);
    const loginDetails = { userName: user.userName, password: user.password };
    const { data, error, loading } = await login({
      variables: loginDetails,
    });
    if (loading) return "Loading...";
    console.log(error);
    if (data && data.login) {
      console.log(data);
      saveTokens(data.login);
      let userObj = await getUserProfile();
      appContext.setUserState(userObj);
      history.push("/dashboard");
    } else {
      setError({ isError: true, message: "username or passowrd is incorrect" });
      setUser(initUser);
    }
  }
  async function getUserProfile() {
    let apolloClient = getApolloClient();
    apolloClient
      .query({
        query: userByUserName,
        variables: { userName: user.userName },
      })
      .then((response) => {
        console.log(response.data);
        return response.data.userByName;
      })
      .catch((err) => console.error(err));
  }
  /************************* End Component Methods ************************ */
  return (
    <div className="login-cover login-bg overflow-scroll">
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
                    Login
                  </span>
                  <img className="col-sm-3 -padding" src={line191} alt="" />
                </div>
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
                        value={user.userName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, userName: val };
                          });
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
                  <Form.Group
                    as={Row}
                    controlId="formPassword"
                    className="no-margin"
                  >
                    <Col sm="12">
                      <input
                        id="txtPassword"
                        type="password"
                        placeholder="Password"
                        className="text-input"
                        value={user.password}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, password: val };
                          });
                        }}
                      />
                      <span className="text-input-span">
                        <i>
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{ color: "#00ffcb" }}
                          />
                        </i>
                      </span>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="checkbox">
                    <Col sm="12">
                      <Form.Check
                        inline
                        label="Remember Me"
                        type="checkbox"
                        id="isRemember"
                        className="template"
                        checked={user.isRemember}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setUser((prevState) => {
                            return { ...prevState, isRemember: val };
                          });
                        }}
                      ></Form.Check>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="submit">
                    <Col sm="12">
                      <div className="login-buttons">
                        <Button
                          className="btn btn-block btn-success btn-lg login-btn"
                          type="submit"
                          disabled={!validateForm()}
                          onClick={submitLogin}
                        >
                          Login
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
                      New User?{" "}
                      <Button variant="link" onClick={registerUser}>
                        Register Here
                      </Button>
                    </Col>
                    <Col
                      sm="12"
                      className="template"
                      style={{ textAlign: "center" }}
                    >
                      <Button variant="link" onClick={forgotPass}>
                        Forgot Password
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
