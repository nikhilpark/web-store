import React,{useContext} from "react";
import { Context } from "./Components/Store"
import NavBar from "./Components/NavBar/NavBar";
import Navbar1 from "./Components/Navbar1/Navbar1";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Create from "./Components/Create/Create"; 
import Product from "./Components/Product/Product";
import ProductsPage from "./Components/ProductsPage/ProductsPage";
import Cart from "./Components/Cart/Cart"
import Edit from "./Components/Edit/Edit"
import Profile from  "./Components/Profile/Profile"
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import UserDetail from "./Components/UserDetail/UserDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from 'react-protected-route-component';



function App() {

  const { userOb } = useContext(Context)

  const userObject = userOb;
  
  const loggedIn = () =>{
    const isLoggedIn = userObject.loggedIn;
    if(isLoggedIn){
      return true;
    }
     return false;
   
  }

  const notLoggedIn = () =>{
    const isLoggedIn = userObject.loggedIn;
    if(isLoggedIn){
      return false;
    }
     return true;
   
  }

  const modAdmin = () =>{
    const isLoggedIn = userObject.loggedIn;
    const userRole = userObject.userRole;
    if(isLoggedIn && (userRole === 1 || userRole === 2)){
      return true;
    }
     return false;
   
  }

  const admin = () =>{
    
    const isLoggedIn = userObject.loggedIn;
    const userRole = userObject.userRole;
    if(isLoggedIn && userRole === 1){
      return true;
    }
     return false;

  }




  return (
   
      <Router>
        <Navbar1/>
        {/* <NavBar /> */}
        <Switch>
          <Route path="/" exact component = {LandingPage}/>
          <ProtectedRoute path="/signin" redirectRoute="/profile" guardFunction={notLoggedIn} component={SignIn} />
          <Route path="/signup" exact component={SignUp} guardFunction={notLoggedIn} />
          <Route path="/products" component={ProductsPage} />
          <ProtectedRoute path="/profile" component={Profile} redirectRoute="/signin" guardFunction={loggedIn} />
          <Route path="/product->:productID" component={Product}  />
          <Route path="/user->:userID" component={UserDetail}  />
          <ProtectedRoute path="/edit->:productID" guardFunction={modAdmin}  component={Edit} />
          <Route path="/cart" exact component={Cart} />
          {/* <ProtectedRoute path="/adminpanel" redirectRoute="/profile" guardFunction={admin} component={AdminPanel} /> */}
          <Route path="/adminpanel" exact component={AdminPanel} />

          <ProtectedRoute path="/create"  component={Create} redirectRoute="/signin" guardFunction={loggedIn}/>
          
         
        </Switch>   
      </Router>
  );
}

export default App;
