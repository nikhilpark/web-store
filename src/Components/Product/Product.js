import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";
import { Context } from "../Store";
import "./Product.scss";

export default function Product(props) {
  const productID = { id: props.match.params.productID };
  const [product, setProduct] = useState();
  const { userOb } = useContext(Context);
  const userObject = userOb;

  const [loading, setLoading] = useState(
    <div style={{ width: "fit-content", margin: "35vh auto" }}>
      <Spinner animation="border" />
    </div>
  );
  const history = useHistory();

  useEffect(() => {
    const errorComp = (
      <div style={{ width: "fit-content", margin: "35vh auto" }}>
        {" "}
        <h1 style={{ color: "red" }}>404: Product not found</h1>{" "}
      </div>
    );
    setTimeout(() => {
      setLoading(errorComp);
    }, 2000);

    const getProduct = async () => {
      try {
        const res = await Axios.post("/products/viewproduct", productID);
        console.log(res.data);
        setProduct(res.data);
      } catch {
        console.log("error");
      }
    };

    getProduct();
  }, [productID.id]);

  const deleteProduct = () => { 
    console.log("yoo");
    const res = Axios.post("/products/delete", { productID });
    history.push("/home");
  };

  const editProduct = () => {
    history.push(`/edit->${product._id}`);
  };

  return (
    <>
      {typeof product === "object" && product !== null ? (
        <div id="prod-cont">
          <Card>
            <Card.Img
              variant="top"
              style={{ height: "60vh", width: "100%", objectFit: "contain" }}
              src={product.banner}
              alt="img"
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: - {product.price}</Card.Text>
              {userObject.loggedIn ? (
                <>
                  {" "}
                  <AddToCart
                    id={product._id}
                    price={product.price}
                    title={product.title}
                  />
                  &nbsp;&nbsp;
                  {userObject.userRole === 1 || userObject.userRole === 2?<>
                  
                    <Button variant="secondary" onClick={editProduct}>
                    {" "}
                    Edit{" "}
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="secondary" onClick={deleteProduct}>
                    {" "}
                    Delete
                  </Button>
                  
                  </>:<></> }
                 
                </>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <>{loading}</>
      )}
    </>
  );
}
