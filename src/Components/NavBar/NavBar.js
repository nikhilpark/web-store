import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import Axios from "axios";
import "./NavBar.scss";
import cartIcon from "./cart.png";
import LogOut from "../LogOut/LogOut";

const NavBar = () => {
  const { cartOb, userOb } = React.useContext(Context);
  const cartObject = cartOb;
  const userObject = userOb;

  const emptyCart = () => {
    const cartItems = {
      user: userObject.username,
      items: 0,
      itemList: [],
    };

    Axios.post("/users/addToCart", cartItems);
  };

  const tippyContent = (
    <div id="tippyContainer">
      {!userObject.loggedIn?<> 
      <div id="firstTippy" className="tippyContent">
        <span id="tippyHead">New Customer ? </span>
        <span id="tippyLink"> <Link to="/signup">SignUp</Link></span>
      </div>
      <hr/>

      <div id="secondTippy" className="tippyContent">
        <span id="tippyLink"> <Link to="/signin" className="linkText">📱&nbsp;&nbsp; My Profile</Link></span>
      </div>
      <hr/>
      <div id="thirdTippy" className="tippyContent">
        <span id="tippyLink"> <Link to="/signin" className="linkText">📦 &nbsp;&nbsp;My orders</Link></span>
      </div>

      </>:
      <>
       <div id="firstTippy" className="tippyContent">
        <span id="tippyHead">Hi, {userObject.username}! </span>
        <span id="tippyLink"> <LogOut/></span>
      </div>
      <hr/>
      <div id="secondTippy" className="tippyContent">
        <span id="tippyLink"> <Link to="/profile" className="linkText">📱&nbsp;&nbsp; My Profile</Link></span>
      </div>
      <hr/>
      <div id="thirdTippy" className="tippyContent">
        <span id="tippyLink"> <Link to="/orders" className="linkText">📦 &nbsp;&nbsp;My orders</Link></span>
      </div>
      <hr/>
      
      </>}
     
      {userObject.userRole === 1 ?<>
        <div id="thirdTippy" className="tippyContent">
        <span id="tippyLink"> <Link to="/adminpanel" className="linkText">👨‍💻 &nbsp;&nbsp;Admin Panel</Link></span>
      </div>
      </>:
      <></>}
      
    </div>
  )
  return (
    <>
      <div id="nav-outer">
        <div id="left-flex" className="nav-member">
          <Link to="/">Web Store</Link>
        </div>

        <div id="right-flex" style={{display:'flex'}} className="nav-member">
        <Tippy  theme="light" interactive content={tippyContent}>

          {userObject.loggedIn?
          <Link to="/signin">
        <button id="accountBtn">My Account</button>
          </Link>:
          <Link to="/signin">
        <button id="loginBtn">Login</button>
          </Link>}
         
        </Tippy>
      
           
          <Link to="/cart">
            <span>
              <img id="cart-icon" src={cartIcon} alt="cart" />
              <span>Cart</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
