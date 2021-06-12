import React,{useContext} from "react";
import { Context } from "./Components/Store"
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Create from "./Components/Create/Create"; 
import Product from "./Components/Product/Product";
import ProductsPage from "./Components/ProductsPage/ProductsPage";
import Cart from "./Components/Cart/Cart"
import Edit from "./Components/Edit/Edit"
import Profile from  "./Components/Profile/Profile"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from 'react-protected-route-component';



function App() {

  const { userOb } = useContext(Context)

  const userObject = userOb;
  
  const guardFx = () =>{
    const isLoggedIn = userObject.loggedIn;
    if(isLoggedIn){
      return true;
    }
     return false;
   
  }

  return (
   
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component = {LandingPage}/>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/products" component={ProductsPage} />
          <ProtectedRoute path="/profile" component={Profile} redirectRoute="/signin" guardFunction={guardFx} />
          <Route path="/product->:productID" component={Product} />
          <Route path="/edit->:productID"  component={Edit} />
          <Route path="/cart" exact component={Cart} />
          <ProtectedRoute path="/create"  component={Create} redirectRoute="/signin" guardFunction={guardFx}/>
          
         
        </Switch>
      </Router>
  );
}

export default App;
