import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
// 



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    };
    
    fetchUsers();
  }, [deletedUserId]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setDeletedUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUndoDelete = () => {
    setDeletedUserId(null);
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/block`);
      setUsers(users.map(user => {
        if (user._id === userId) {
          return {
            ...user,
            blocked: true
          }
        }
        return user;
      }));
    } catch (error) {
      console.log(error);
    }
  }


  

  const filteredUsers = users.filter((user) => user._id !== deletedUserId);

  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/>

      <h2>User List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Profile</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Verified</th>
            <th>Phone</th>
            <th>User Type</th>
            <th>Experience</th>
            <th>Gender</th>
            <th>Certificate Title</th>
            <th>Certificate Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              {/* <td>{user.profile}</td> */}
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.verified ? "Yes" : "No"}</td>
              <td>{user.phone}</td>
              <td>{user.userType}</td>
              <td>{user.experience}</td>
              <td>{user.gender}</td>
              <td>{user.certificate ? user.certificate.title : "-"}</td>
              <td>{user.certificate ? user.certificate.date : "-"}</td>
              <td>
  {/* <Button className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </Button> */}
  <Button
    className={styles.delete}
    onClick={() => handleDeleteUser(user._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
};

export default UserList;
