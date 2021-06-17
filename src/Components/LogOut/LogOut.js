import React from 'react'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

export default function LogOut() {

    const logOut = async () => {
        const res = await Axios.get("users/logout");
        if (res.status === 200) {
          console.log("succsfully logged out");
          window.location = "/";
        }
      };

    return (
       <Button variant="danger" style={{padding:"0.2rem 0.6rem"}} onClick={logOut}>Logout</Button>
    )
}
