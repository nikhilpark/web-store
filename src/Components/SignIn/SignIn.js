import React, { useState} from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import "./SignIn.scss";


export default function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn,setloggedIn] = useState(false);


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
      setloggedIn(true)
      window.location = "/home"
      
    }
  };
 
  return (
    <>
      <div style={{ width: "30vw", margin: "5vh auto" }}>
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
