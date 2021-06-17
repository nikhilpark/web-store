import React, { useState, useEffect } from "react";
import { Form, Alert, Spinner } from "react-bootstrap";
import Axios from "axios";
import "./UserDetail.scss";

export default function UserDetail(props) {
  const userID = { id: props.match.params.userID };
  const [user, setUser] = useState({});
  const [modifiedRole, setModifiedRole] = useState("");
  const [roleAlert, setRoleAlert] = useState({ display: "none" });
  const [deleteAlert, setDeleteAlert] = useState({ display: "none" });
  const [roleSpinner, setRoleSpinner] = useState({ display: "none" });
  const [deleteSpinner, setDeleteSpinner] = useState({ display: "none" });

  useEffect(() => {
    const getUser = async () => {
      const res = await Axios.post("users/getuserbyId", { id: userID.id });
      setUser(res.data);
    };

    getUser();
  }, [userID.id]);

  const userRole = (role) => {
    if (role === 1) {
      return <span>Administrator</span>;
    } else if (role === 2) {
      return <span>Moderator</span>;
    } else if (role === 3) {
      return <span>Standard</span>;
    }
  };
  const handleSelect = (e) => {
    setModifiedRole(e.target.value);
  };

  const handleRoleForm = async (e) => {
    e.preventDefault();
    const sure = prompt("Confirm action? type 'yes' ");
    if (sure === "yes") {
      setRoleSpinner({ display: "inline-block", marginLeft: "1vw" });
      const modifiedUser = {
        id: userID,
        userRole: modifiedRole,
      };
      const res = await Axios.post("users/setRole", modifiedUser);
      if (res.status === 200) {
        setRoleSpinner({ display: "none" });
        setRoleAlert({ display: "block" });
        setTimeout(() => {
          setRoleAlert({ display: "none" });
          window.location.reload();
        }, 2000);
      }
    }
  };

  const deleteUser = async (e) => {
    const sure = prompt("Confirm action? type 'yes' ");
    if (sure === "yes") {
      setDeleteSpinner({ display: "inline-block", marginLeft: "1vw" });
      const res = await Axios.post("users/deleteUser", { id: userID });
      if (res.status === 200) {
        setDeleteSpinner({ display: "none" });
        setDeleteAlert({ display: "block" });

        setTimeout(() => {
          setDeleteAlert({ display: "none" });
          window.location = "/adminpanel"
        }, 2000);
      }
    }
  };

  return (
    <>
      <div id="detailCont">
        <div id="details">
          <div>
            <span>Username -- </span>
            {user.username}
          </div>

          <div>
            <span>User-Role -- </span>
            {userRole(user.userRole)}
          </div>

          <div>Email -- {user.email}</div>
        </div>
        <div id="roleEditCont">
          <Form onSubmit={handleRoleForm} style={{ display: "flex" }}>
            <Form.Control
              onChange={handleSelect}
              style={{ display: "flex" }}
              as="select"
            >
              <option disabled selected="selected">
                Change Role
              </option>
              <option value={1}> Administrator</option>
              <option value={2}>Moderator</option>
              <option value={3}> Standard</option>
            </Form.Control>
            {modifiedRole === "" ? (
              <>
                <button disabled type="submit">
                  Save
                </button>
              </>
            ) : (
              <>
                <button type="submit">Save</button>
                <Spinner style={roleSpinner} animation="border" />
              </>
            )}
          </Form>
          <button id="delBtn" onClick={deleteUser}>
            Delete User
          </button>
          <Spinner style={deleteSpinner} animation="border" />
        </div>

        <div style={roleAlert}>
          <Alert variant={"success"}>Succesfully updated!</Alert>
        </div>
        <div style={deleteAlert}>
          <Alert variant={"success"}>Succesfully deleted!</Alert>
        </div>
      </div>
    </>
  );
}
