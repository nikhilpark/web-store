import React, { useState,useContext } from "react";
import { Context } from "../Store";
import { Form, Button, Col } from "react-bootstrap";
import "./Profile.scss";
import Axios from "axios";
import statelist from "../../misc/statelist";


export default function Profile() {
  const { userOb } = useContext(Context);
  const userObject = userOb;

  const username = userObject.username;
  const loggedIn = userObject.loggedIn;
  const [fName,setFname] = useState(userObject.firstname);
  const [lName,setLname] = useState(userObject.lastname);
  const [add1,setAdd1] = useState(userObject.address1);
  const [add2,setAdd2] = useState(userObject.address2); 
  const [city,setCity] = useState(userObject.city);
  const [state,setState] = useState(userObject.state);
  const [zip,setZip] = useState(userObject.zip);
  const [contactNo,setContactNo] = useState(userObject.contactno);
 


  const handleForm = async(e) => {
    e.preventDefault();
    const userData = {
        username: username,
        firstname: fName,
        lastname: lName,
        address1: add1,
        address2:add2,
        contactno:contactNo,
        city:city,
        state:state,
        zip:zip,
    }
    const res = await Axios.post('/users/addData',userData)
    console.log(res)
  };



  const logOut = async () => {
    const res = await Axios.get("users/logout");
    if (res.status === 200) {
      console.log("succsfully logged out");
      window.location = "/";
    }
  };
  return (
    <>
      <div id="cont">
        <div id="greeting-cont">
         
          {loggedIn ? <Button variant="danger" onClick={logOut}>Logout</Button> : <></>}
        </div>
        {loggedIn ? 
        <div id="form-cont">
            { userObject.firstname && userObject.lastname && userObject.address1 && userObject.address2
            && userObject.city && userObject.contactno && userObject.state && userObject.zip

          ?
            
             <h2>Edit your profile :</h2> : 
             <h2>Complete your profile :</h2>
            }

            
          <Form onSubmit = {handleForm}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" defaultValue={userObject.firstname} placeholder="First Name" onChange = {(e)=>setFname(e.target.value)} />
              </Form.Group> 

              <Form.Group as={Col} controlId="formGridlLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" defaultValue={userObject.lastname} placeholder="Last Name" onChange = {(e)=>setLname(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" defaultValue={userObject.address1} onChange = {(e)=>setAdd1(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" defaultValue={userObject.address2} onChange = {(e)=>setAdd2(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridContact">
              <Form.Label>Contact no.</Form.Label>
              <Form.Control type="number" defaultValue={userObject.contactno} onChange = {(e)=>setContactNo(parseInt(e.target.value))} />
            </Form.Group>


            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity" >
                <Form.Label>City</Form.Label> 
                <Form.Control defaultValue={userObject.city} onChange = {(e)=>setCity(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State / UT</Form.Label>
                <Form.Control as="select"  defaultValue={userObject.state} onChange = {(e)=>setState(e.target.value)}>
                  <option>Choose...</option>
                {statelist.map((el,idx)=>{return(
                    <option key={idx}>{el}</option>
                )})}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="number" defaultValue={userObject.zip} onChange = {(e)=>setZip(parseInt(e.target.value))}/>
              </Form.Group>
            </Form.Row>

            {/* <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        :<></>}
      </div>
    </>
  );
}
