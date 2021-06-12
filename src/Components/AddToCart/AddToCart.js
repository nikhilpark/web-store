import React, { useState, useContext } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Axios from "axios";


export default function AddToCart(props) {
  const { cartOb, userOb } = useContext(Context);
  const cartObject = cartOb;
  const userObject = userOb;
 
 

  const [alert, setAlert] = useState({
    display: "none",
  });

  const [ke, setKe] = useState();

  const addToCart = async () => {
    const itemL = cartObject.itemList;
   
    let newList = [];

    const item = { title: props.title, id: props.id, price: props.price };

    const exist = itemL.find((x) => x.id === item.id);
 
    if (exist) {
      newList = itemL.map((x) =>
        x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
      );
    } else {
      newList = [...itemL, { ...item, qty: 1 }];
    }
  
    const cartItems = {
      user:userObject.username,
      items: newList.length,
      itemList: newList
    }
    console.log(cartItems)
    const response = await Axios.post("/users/addToCart",cartItems)
    if (response.status === 200){
      setKe(props.id);
      setAlert({
        display: "block",   
        marginTop: "2vh",
      });
      setTimeout(() => {
        setAlert({
          display: "none",
        });
      }, 2000);
  
  
  
      // stateSet({
      //   items: newList.length,
      //   itemList: newList,
      // });
    }
   

  
  };

  return (
    <>
      {userObject.loggedIn ? (
        <>
          <Button variant="secondary" onClick={addToCart}>
            Add to Cart
          </Button>
          {props.id === ke ? (
            <div style={alert}>
              <Alert variant="success">
                Product added to &nbsp;<Link to="/cart">Cart</Link>
              </Alert>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>

        </>
      )}
    </>
  );
}
