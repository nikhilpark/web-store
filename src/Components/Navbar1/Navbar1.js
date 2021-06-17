import React, { useState } from "react";
import "./Navbar1.scss";
import { Context } from "../Store";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import cartIcon from "../NavBar/cart.png";
import LogOut from "../LogOut/LogOut";

const Navbar1 = () => {
  const [click, setClick] = useState({ clicked: false });

  const { cartOb, userOb } = React.useContext(Context);
  const cartObject = cartOb;
  const userObject = userOb;

  const handleClick = () => {
    setClick({ clicked: !click.clicked });
  };

  const tippyContent = (
    <div id="tippyContainer">
      {!userObject.loggedIn ? (
        <>
          <div id="firstTippy" className="tippyContent">
            <span id="tippyHead">New Customer ? </span>
            <span id="tippyLink">
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
          <hr />

          <div id="secondTippy" className="tippyContent">
            <span id="tippyLink">
              <Link to="/signin" className="linkText">
                📱&nbsp;&nbsp; My Profile
              </Link>
            </span>
          </div>
          <hr />
          <div id="thirdTippy" className="tippyContent">
            <span id="tippyLink">
              <Link to="/signin" className="linkText">
                📦 &nbsp;&nbsp;My orders
              </Link>
            </span>
          </div>
        </>
      ) : (
        <>
          <div id="firstTippy" className="tippyContent">
            <span id="tippyHead">Hi, {userObject.username}! </span>
            <span id="tippyLink">
              <LogOut />
            </span>
          </div>
          <hr />
          <div id="secondTippy" className="tippyContent">
            <span id="tippyLink">
         
              <Link to="/profile" className="linkText">
                📱&nbsp;&nbsp; My Profile
              </Link>
            </span>
          </div>
          <hr />
          <div id="thirdTippy" className="tippyContent">
            <span id="tippyLink">
           
              <Link to="/orders" className="linkText">
                📦 &nbsp;&nbsp;My orders
              </Link>
            </span>
          </div>
          <hr />
        </>
      )}

      {userObject.userRole === 1 ? (
        <>
          <div id="thirdTippy" className="tippyContent">
            <span id="tippyLink">
        
              <Link to="/adminpanel" className="linkText">
                👨‍💻 &nbsp;&nbsp;Admin Panel
              </Link>
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <nav className="NavbarItems">
        <h1 className="navbar-logo">
            <Link to  = "/products">
          Web Store<i className="fab fa-react"></i>
          
          </Link>
        </h1>
     
      <div className="menu-icon" onClick={handleClick}>
        <i className={click.clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul id="navList" style={{margin:0}} className={click.clicked ? "nav-menu active" : "nav-menu"}>
      
        <li>
          <Tippy theme="light" interactive content={tippyContent}>
            {userObject.loggedIn ? (
               
                <div id="loginBtn">
                  <Link className="link-style" to ="/profile">My account</Link>
                </div>
             
            ) : (
              
                  <div id="loginBtn">
                  <Link className="link-style" to = "/signin">Login</Link>
                </div>
            
            )}
          </Tippy>
        </li>
        <li>
          <Link className="white-link" to="/cart">
            <span>
              <img id="cart-icon" src={cartIcon} alt="cart" />
              <span>Cart</span>
            </span>
          </Link>
        </li>
        {userObject.userRole === 1 || userObject.userRole === 2?<>
        
            <li>
        <Link className="white-link" to="/create">
            <span>
              <span>Create</span>
            </span>
          </Link>
        </li>
        </>:<></>}
      
      </ul>
    </nav>
  );
};

export default Navbar1;
