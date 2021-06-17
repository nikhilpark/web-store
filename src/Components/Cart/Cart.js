
import React,{useContext, useState} from 'react'
import {Card,Button,Spinner} from 'react-bootstrap'
import {Context} from "../Store";
import Axios from "axios"

export default function Cart() {

    const {cartOb,userOb} = useContext(Context);
    const [ke,setKe] = useState();
    const [spinner,setSpinner] = useState({display:'none'});

  const cartObject = cartOb;
  const userObject = userOb;

    const grid={
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:'2px'
        
}

const gridItem = {
    border:'1px solid #343a40',
    padding:'4px',
    
}

const qtyPlus = async (el) =>{
    setKe(el.id)
    setSpinner({display:"inline-block",marginLeft:"1vw"})
    const itemL = cartObject.itemList

    const exists = itemL.find(x=>x.id===el.id);

    const newList = itemL.map((x)=>
    x.id === el.id ? {...exists,qty:exists.qty+1} :x
    )

    const cartItems = {
        user:userObject.username,
        items: newList.length,
        itemList: newList
      }
    const res = await Axios.post("/users/addToCart",cartItems)
    if(res.status === 200) {
        setSpinner({display:"none"})
    }
 
}

const qtyMinus = async (el)=>{
    setKe(el.id)
    setSpinner({display:"inline-block",marginLeft:"1vw"})
    const itemL = cartObject.itemList
    const exists = itemL.find(x=>x.id===el.id); 


    
  
    const newList = itemL.map((x)=>
    x.id === el.id  && el.qty>0 ? {...exists,qty:exists.qty-1} :x
    )


    const finalList = newList.filter(e=>e.qty>0) 

    const cartItems = {
        user:userObject.username,
        items: finalList.length,
        itemList: finalList
      }

      const res = await Axios.post("/users/addToCart",cartItems)
      if(res.status === 200) {
          setSpinner({display:"none"})
      }

    
}
    return (
        <>
        <div style={{ width:'60vw',margin:'5vh auto' }}>

    

        {cartObject.itemList.length>0?
        <Card>
            <div>
                <h1>Cart :</h1>
            </div>
            <div></div>
            <div style={grid}> 

                <div>Item</div>
                <div>Qty.</div> 
                <div>Price</div>

                {cartObject.itemList.map((el,key)=>{
                    return (
                        <> {el.qty>0?
                            <>
                                <div style={gridItem}>{el.title}</div>
                                <div style={gridItem}>
                                    <span>{el.qty}</span>
                                    <Button variant="secondary" onClick={()=>qtyPlus(el)} style={{width:'2vw',margin:"0px 10px",padding:"0.1rem 1rem"}}>+</Button>
                                    <Button variant="dark" onClick={()=>qtyMinus(el)}  style={{width:'2vw', padding:"0.1rem 1rem"}}>-</Button>
                                    {el.id === ke ? <Spinner style={spinner} animation="border" size="sm"/>:<></> }
                                    
                            </div>
                            <div style={gridItem}>{el.qty*el.price} ₹</div>
                            </>
                            :<div style={{display:'none'}}>
                            <div></div>  
                            <div></div>
                            <div></div>
                            </div>}
                        </>
                    ) 
                }
                ) 
            }
            </div>
            <hr/>
            <div style={{display:'flex'}}>
                <div>Total</div>
                <div style={{display:'flex',width:'42vw',justifyContent:'flex-end'}}>
                {cartObject.itemList.reduce((n,{price,qty})=> n + price*qty, 0)} ₹
                </div>
            </div>
           
        </Card>
        :<div>Cart is Empty</div>}
        </div>
        </>
    )
}
