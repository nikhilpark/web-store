import axios from 'axios';
import React,{useState,useEffect} from 'react';


export const Context =  React.createContext();




const Store = ({ children }) =>{

    const [userObject, setUserObject] = useState({
        username:'Guest',
        loggedIn:false
    });

    const [cart,setCart] = useState(

        {
            items:0,
            itemList:[], 
        
        }
    );

   

    useEffect(()=>{
        axios.get("/users/getuser").then((res)=>{

            if(res.data){
          
                setUserObject({username:res.data.username,
                                email:res.data.email,
                                address1:res.data.address1,
                                address2:res.data.address2,
                                city:res.data.city,
                                contactno:res.data.contactno,
                                firstname:res.data.firstname,
                                lastname:res.data.lastname,
                                state:res.data.state,
                                zip:res.data.zip,
                            loggedIn:true
                });
               
            }
        })

        if(userObject.loggedIn){
        axios.get("users/getcart").then((res)=>{
            const fetchedCart = res.data;
            setCart(fetchedCart); 
    
        })
        
    }
    
    },[userObject])
    

 
    return (

        <Context.Provider value={{cartOb:cart,userOb:userObject}}   >{children}</Context.Provider>

    )
} 

export default Store;