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
                📲&nbsp;&nbsp; Login
              </Link>
            </span>
          </div>

          <div id="secondTippy" className="tippyContent">
            <span id="tippyLink">
              <Link to="/signin" className="linkText">
                👤&nbsp;&nbsp; My Profile
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
            <span id="tippyHead">Welcome, </span>
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
            <Link to  = "/products" onClick={handleClick}>
          Web Store<i className="fab fa-react"></i>
          
          </Link>
        </h1>
     
      <div className="menu-icon" onClick={handleClick}>
        <i className={click.clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
     
      <ul id="navList" style={{margin:0}} className={click.clicked ? "nav-menu active" : "nav-menu"}>
      <hr/>
        <li>
          <Tippy id="tippy" trigger="click" theme="light" interactive content={tippyContent}>
            {userObject.loggedIn ? (
               
                <div id="loginBtn">
                  Hey, {userObject.firstname}
                </div>
             
            ) : (
              
                  <div id="loginBtn">
                  Hey, Guest
                </div>
            
            )}
          </Tippy>  
        </li>
         {userObject.loggedIn?<></>:
         <>
          <li className="hamLi">
          <Link className="white-link" onClick={handleClick} to="/signin">
          <span className="hamLink">
            Log in
          </span>
          </Link>
        </li>

         <li className="hamLi">
          <Link className="white-link" onClick={handleClick} to="/signup">
          <span className="hamLink">
            Sign up
          </span>
          </Link>
        </li>
         </>
         }
        <li className="hamLi">
          <Link  className="white-link" onClick={handleClick} to="/profile">
          <span className="hamLink">
            Profile
          </span>
          </Link>
        </li>
        <li className="hamLi">
          <Link  className="white-link" onClick={handleClick} to="/profile">
          <span className="hamLink">
            My Orders
          </span>
          </Link>
        </li>
        {userObject.userRole === 1?<>
        <li className="hamLi">
          <Link  className="white-link" onClick={handleClick} to="/profile">
          <span className="hamLink">
            Admin Panel
          </span>
          </Link>
        </li></>:<></>}
        
        <li>
          <Link className="white-link" onClick={handleClick} to="/cart">
            <span className="hamLink">
              <img id="cart-icon" src={cartIcon} alt="cart" />
              <span  >Cart</span>
            </span>
          </Link>
        </li>
        {userObject.userRole === 1 || userObject.userRole === 2?<>
        
            <li>
        <Link onClick={handleClick} className="white-link" to="/create">
            <span>
              <span className="hamLink">Create</span>
            </span>
          </Link>
        </li>
        </>:<></>}
       {userObject.loggedIn?<div className="hamLi"><LogOut/></div>:<></>}
      
      </ul>
    </nav>
  );
};

export default Navbar1;
