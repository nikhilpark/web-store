import React,{useState} from "react";
import {Form,Button} from 'react-bootstrap';
import Axios from 'axios';
import { Alert } from "react-bootstrap";
import {Link} from "react-router-dom"
import './SignUp.scss'

export default function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password,setPassword] = useState();
  const [password2,setPassword2] = useState();
  const [succesAlert,setSuccessAlert] = useState({display:'none'})
  const [failureAlert,setFailureAlert] = useState({display:'none'})

  const handleUsername = (e) =>{
    setUsername(e.target.value) 
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  const handlePassword2 = (e)=>{
    setPassword2(e.target.value)
  }


  const handleForm = async(e) =>{
    
    e.preventDefault();
  if (password === password2){
    const user = {
      username: username,
      email: email, 
      password:password,

    }


    const res = await Axios.post("/users/signup",user)
    if (res.status ===200){
      if(res.data.code === 101 ){
        console.log("user already exists")
        setFailureAlert({display:'block'})
        setTimeout(()=>{
          setFailureAlert({display:'none'})
        },4000)
      }
      if(res.data.code === 100 ){
        console.log("user succesfully registered")
        setSuccessAlert({display:'block'})
      }
    } 
  }else{
    console.log("Passwords dont match")
  }
  }

  return <>
<div style={{width: "30vw",margin:"5vh auto"}}>
  <Alert variant="success" style={succesAlert}>
    Succesfully registered! 
    &nbsp;&nbsp;&nbsp;
    <Link to="/signin">SignIn</Link>
  </Alert>


  <Alert variant="danger" style={failureAlert} >
    Username taken!
    &nbsp;&nbsp;&nbsp;
  </Alert>

<Form onSubmit={handleForm}>
         <Form.Group  controlId="formGroupUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text"  required placeholder="Enter User Name" onChange={handleUsername} />
         </Form.Group>
         <Form.Group  controlId="formGroupUserEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required placeholder="Enter Email" onChange={handleEmail} />
         </Form.Group>
        <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required placeholder="Enter Password" onChange={handlePassword}  />
        </Form.Group>
        <Form.Group controlId="formGroupPassword2">
            <Form.Label>Price</Form.Label>
            <Form.Control type="password" required  placeholder="Repeat Password" onChange={handlePassword2} />
         </Form.Group>
        
         <Button variant="outline-primary" block type="submit">Submit!</Button>

    </Form>
    </div>
  </>;
}
