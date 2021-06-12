import React, {useState}  from "react";
import { Form,Button,Alert } from "react-bootstrap"
import Axios from "axios"


const NewProductForm = ( props ) =>{

    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [banner, setBanner] = useState(props.banner)
    const [alert, setAlert] = useState({display:"none"})

const getTitle = (e) =>{
    setTitle(e.target.value);
}
const getDescription = (e) =>{
    setDescription(e.target.value);
}
const getPrice = (e) =>{
    setPrice(e.target.value);
}
const getBanner = (e) =>{
    setBanner(e.target.value);
}


const handleForm = async (e) => {

    if(!props.edit)
    {

        e.preventDefault();

    
        const product = {
            title: title,
            description: description,
            price: parseInt(price),
            banner: banner,
        }
    
         const res = await Axios.post("/products/create",product)
        if (res.status === 200){
            setAlert({display:"block"})
        }
    }   else{
        e.preventDefault();

        const product = {
            id: props.id,
            title: title,
            description: description,
            price: parseInt(price),
            banner: banner,
        }

        const res = await Axios.patch("/products/edit",product)
        if (res.status === 200){
            setAlert({display:"block"})
        }
    
    console.log(product)
}


}




    return(
        
    <div style={{width: "40vw",margin:"2vh"}}>
        
        <div style={alert}>
            {!props.edit?
            <Alert variant={"success"}>
                Product created succesfully!
            </Alert>
    :
            <Alert variant={"success"}>
                Product updated succesfully!
            </Alert>
}
        </div>


        <Form onSubmit={handleForm}>
         <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"  defaultValue={props.title} placeholder="Enter Title" onChange={getTitle}/>
         </Form.Group>
        <Form.Group controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" required defaultValue={props.description} rows={5} placeholder="Description" onChange={getDescription} />
        </Form.Group>
        <Form.Group controlId="formGroupPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" defaultValue={props.price} placeholder="Enter Price" onChange={getPrice} />
         </Form.Group>
         <Form.Group controlId="formGroupBanner">
            <Form.Label>Banner</Form.Label>
            <Form.Control type="text" defaultValue={props.banner} placeholder="Enter link to the Banner" onChange={getBanner} />
         </Form.Group>

         <Button variant="outline-primary" block type="submit">Submit!</Button>

    </Form>

    
    </div>
    )
}

export default NewProductForm;