import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner} from "react-bootstrap";
import Axios from "axios";

import AddToCart from "../AddToCart/AddToCart"

import { LinkContainer } from "react-router-bootstrap";

import "./Products.scss";

export default function Products({products, loading}) {
  

  return (
    <>
      {Array.isArray(products) ? (
        products.map((el) => {
          return (
            <Card key={el._id} className="pd">
              <Card.Img
                className="pimg"
                style={{ height: "25vh", width: "100%", objectFit: "contain" }}
                variant="top"
                src={el.banner}
                alt="img"
              />
              <Card.Body>
                <LinkContainer className="plink" to={`/product->${el._id}`}>
                  <Card.Title>
                    <span id="ptitle">{el.title}</span>
                  </Card.Title>
                </LinkContainer>

                <Card.Text>Price: - {el.price}</Card.Text>
          
                <AddToCart title={el.title} id={el._id} price={el.price} />
              </Card.Body>
            </Card>
      
          )
        })
      ) : (
        <div style={{ width: "fit-content", margin: "35vh auto" }}>
          <Spinner animation="border" />{" "}
        </div>
      )} 
    </>
  );
}
