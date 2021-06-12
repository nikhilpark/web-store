import React, { useState} from "react";
import { Form, Button, Alert,Spinner } from "react-bootstrap";
import Axios from "axios";

import "./SignIn.scss";


export default function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [succesAlert,setSuccesAlert] = useState({display:'none'})


  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };
    const res = await Axios.post("/users/signin", user);
    if(res.status === 200){
      setSuccesAlert({display:'block'})
      setTimeout(()=>{
        window.location = "/products"
      },2000)
      
      
    }
  };
 
  return (
    <>
      <div style={{ width: "30vw", margin: "5vh auto" }}>

    <Alert variant="success" style={succesAlert}>
      Success.. taking you to store &nbsp;&nbsp; <Spinner size="sm" animation='grow'/>
    </Alert>

        <Form onSubmit={handleForm}>
          <Form.Group controlId="formGroupUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter User Name"
              onChange={handleUsername}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Enter Password"
              onChange={handlePassword}
            />
          </Form.Group>

          <Button variant="outline-primary" block type="submit">
            Submit!
          </Button>
        </Form>
      </div>
    </>
  );
}
