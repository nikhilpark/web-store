import React,{useEffect, useState} from 'react'
import NewProductForm from '../NewProductForm/NewProductForm'
import {Container, Row} from 'react-bootstrap'
import Axios from 'axios'




export default function Edit(props) {


    const productID = {id :props.match.params.productID}
    const [product,setProduct] = useState({})


    const getProduct = async () =>{
        const res = await Axios.post("/products/viewproduct",productID)
        setProduct(res.data)

      
       
    }
    
    
    useEffect( ()=>{
    
       getProduct()
        
    },[])

    

    const container = { 
        marginTop: "5vh",
    };

    return (
        <Container>
        <Row style={container} className="justify-content-center">
            <NewProductForm 
            title={product.title} 
            description={product.description} 
            price={product.price} 
            banner={product.banner}
            id={product._id}
            edit="true"
            />
        </Row>
    </Container>  
    
    )
}
