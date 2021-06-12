import React, { useState, useContext } from "react";
import { Button, Alert,Spinner,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Axios from "axios";
import './AddToCart.scss'


export default function AddToCart(props) {
  const { cartOb, userOb } = useContext(Context);
  const [spinner,setSpinner] = useState({display:'none'});
  const [show,setShow] = useState(false);

  const cartObject = cartOb;
  const userObject = userOb;
  
 
const handleClose = ()=>{
  setShow(false)
}
const goToCart = () =>{
  setShow(false)
  window.location="/cart"
}
 

 
  const addToCart = async () => {

    setSpinner({display:'inline-block',marginLeft:'5px'})

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

      setSpinner({display:'none'})
      setShow(true);
  
  
  

    }
   

  
  };

  return (
    <>
      {userObject.loggedIn ? (
        <>
          <Button variant="secondary" onClick={addToCart}>
            Add to Cart
            <Spinner style={spinner} animation="border" size="sm"/>
          </Button>

          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Succesfully Added</Modal.Title>
        </Modal.Header>
        <Modal.Body> {props.title} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={goToCart}>
            Go to Cart
          </Button>
        </Modal.Footer>
      </Modal>
      
      
        </>
      ) : (
        <>

        </>
      )}
    </>
  );
}
