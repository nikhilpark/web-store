import React, {useState, useEffect, useContext} from 'react';
import {Navbar,Nav,Button,NavDropdown,Container} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import {Context} from "../Store";
import Axios from "axios"
import './NavBar.scss'


const NavBar = () => {


  const {cartOb, userOb} = React.useContext(Context);
  const cartObject = cartOb;
  const userObject = userOb;
  console.log(userObject);
 

  const emptyCart = () =>{
 
    const cartItems = {
      user:userObject.username,
      items: 0,
      itemList: []
    }

    Axios.post("/users/addToCart",cartItems)
  
 
  }


  console.log(cartObject.itemList)
  
 

  return (


      <>

  <Navbar  collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">

  <Nav style={{width:"20vw"}}><LinkContainer  to="/home"><Navbar.Brand>Shopping App</Navbar.Brand></LinkContainer></Nav>
  
  <Navbar.Toggle class="navbar-toggler collapsed"  aria-controls="responsive-navbar-nav" />
    
  <Navbar.Collapse  id="responsive-navbar-nav">
 
  
  <Nav id="navbar" style={{}}>
  <LinkContainer to="/profile"><Nav.Link>{userObject.username}</Nav.Link></LinkContainer>
    {userObject.loggedIn?<>


     <LinkContainer to="/create"><Nav.Link>Create</Nav.Link></LinkContainer>
    
     </>
     :<></>}
   
    {!userObject.loggedIn?<>
      <LinkContainer to="/signin"><Nav.Link>Sign In</Nav.Link></LinkContainer>
    <LinkContainer to="/signup"><Nav.Link>Sign Up</Nav.Link></LinkContainer>
    </>:<></>}
   
   

    <Nav className="me-auto"> 
   
    <NavDropdown className="navdd" style={{color:'grey'}} title={["🛒", <sup> {cartObject.items} </sup>]} id="collasible-nav-dropdown">

  {cartObject.itemList.map((el,key)=>{ 
    return(


      <>
      {el.qty>0?
      <LinkContainer to={`/product${el.id}`}>
      
        <NavDropdown.Item   key={key}> 
        {el.title}
        <span style={{margin:"0px 4px",fontSize:"0.8rem"}}>
          ({el.qty})
        </span>
        {/* <div style={{display:'flex'}}>
        <div style={{backgroundColor:"#343a40",color:"white",borderRadius:'10px', padding:"2px 5px", width:"fit-content"}}>
          {el.price*el.qty} ₹ </div>
        </div>  */}
        </NavDropdown.Item>
        </LinkContainer>
  :<div style={{display:'none'}}></div>} 
      </>
  
    ) 
    
  })}
  
  { cartObject.itemList.length !== 0 ? 
  <>  
   <NavDropdown.Divider />
  {/* <LinkContainer to="/cart"><NavDropdown.Item>Total <div style={{backgroundColor:"#343a40",color:"white",borderRadius:'10px', padding:"2px 5px", width:"fit-content"}}>
    {state.itemList.reduce((n,{price,qty})=> n + price*qty, 0)} ₹</div></NavDropdown.Item></LinkContainer>
     */}
    <LinkContainer className="ddItem" to="/cart"><NavDropdown.Item>Go to Cart

</NavDropdown.Item></LinkContainer>
  <NavDropdown.Item onClick={emptyCart} >Reset 🛒❌ </NavDropdown.Item>
  </>
      :       <NavDropdown.Item >It's lonely here 🙁</NavDropdown.Item> }
    </NavDropdown>
      </Nav>

      </Nav>    
  </Navbar.Collapse>

</Navbar>
</>
  );
};

export default NavBar;
