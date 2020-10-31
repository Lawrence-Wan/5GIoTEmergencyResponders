import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Button, Form, Modal, Navbar, NavDropdown, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MaskedInput from "react-text-mask";
import userIcon from "../../images/user.png";
import "../../styles/header.css";
import AppContext from "../appContext";
import { getUserToken, removeTokens, removeUserToken } from "../manageTokens";

export default function Header() {
  /*************** DATA ********************* */
  const appContext = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [user] = useState(
    appContext.globalState.user ? appContext.globalState.user : getUserToken()
  );
  let history = useHistory();
  const [userProfile, setUserProfile] = useState(user);

  /******************** Methods ***************** */

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function validateForm() {
    return (
      userProfile.email.length > 0 &&
      userProfile.contactNumber.length > 0 &&
      userProfile.address.length > 0 &&
      userProfile.firstName.length > 0 &&
      userProfile.lastName.length > 0
    );
  }

  async function saveChanges(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log("Going to update user from FRONTEND:", userProfile);
    if (!validateForm()) {
      setError({ isError: true, message: "All fields are required" });
      return;
    }
    const { data, error } = await updateUser({
      variables: userProfile,
    });
    console.log(error);
    console.log(data);
    if (data) {
      setShow(false);
    }
    setError({ isError: true, message: "Error from Server side." });
  }

  function logout() {
    removeUserToken();
    removeTokens();
    history.push("/");
  }

  /******************* APollo Queries **************** */
  const [updateUser] = useMutation(gql`
    mutation updateUser(
      $_id: String
      $userName: String!
      $password: String!
      $email: String!
      $firstName: String!
      $lastName: String!
      $contactNumber: String!
      $address: String!
      $role: String!
    ) {
      updateUser(
        _id: $_id
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
  /*************END****************** */
  return (
    <div className="header">
      <Navbar variant="dark" className="color-nav">
        <Navbar.Brand>
          Welcome{" "}
          {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)},{" "}
          {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <img
            src={userIcon}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
          <NavDropdown
            title={
              <span className="dropdown-text">
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}
                ,{" "}
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </span>
            }
            style={{ color: "#ffffff !important" }}
          >
            <NavDropdown.Item onClick={handleShow}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={userProfile.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, email: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={userProfile.firstName}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, firstName: val };
                  });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={userProfile.lastName}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, lastName: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userProfile.password}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, password: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={userProfile.address}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, address: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicContact">
              <Form.Label>Contact Number</Form.Label>
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
                class="form-control"
                placeholder="Contact Number"
                value={userProfile.contactNumber}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prevState) => {
                    return { ...prevState, contactNumber: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="error message">
              <div
                className={error.isError ? "alert alert-danger" : "hidden"}
                role="alert"
              >
                {error.message}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
