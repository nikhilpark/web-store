import React, { useEffect, useState, useContext } from "react";
import "./AdminPanel.scss";
import Axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);


 
  useEffect(() => {
    const getUsers = async () => {
      const res = await Axios.get("/users/getAll");
      setUsers(res.data);
    };

    getUsers();
  }, []);

    


  const userRole = (role) => {
    if (role === 1) {
      return (
        <span>Administrator</span>
      );
    } else if (role === 2) {
      return (
      <span>Moderator</span>
      );
    } else if (role === 3) {
      return (
        <span>Standard</span>
      );
    }
  };
  return (
    <>
      {users.length !== 0 ? (
        <div id="outerPCont">
          <div id="pHead">All users</div>
          <div id="panelCont">
            <>
              <div>User-name</div>
              <div>Email</div>
              <div>User-role</div>
            </>

            {users.map((el) => {
              return (
                <>
                  <div><Link to={`user->${el._id}`}>{el.username}</Link></div>
                  <div>{el.email}</div>
                  <div>{userRole(el.userRole)}</div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div style={{ width: "fit-content", margin: "35vh auto" }}>
            <Spinner animation="border" />{" "}
          </div>
        </>
      )}
    </>
  );
}
