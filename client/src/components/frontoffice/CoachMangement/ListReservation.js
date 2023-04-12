import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import FooterFront from "../shared/FooterFront";

const ListReservation = (props) => {
  const [reservations, setReservations] = useState([]);
  const [formValues, setFormValues] = useState({
    username: '',
    age: '',
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    try {
      const user = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/reservations/spesific?user=${user}`);
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      getReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/${id}`);
      setFormValues(response.data);
      setEditing(true);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/reservations/${editId}`, formValues);
        setSuccessMessage('Reservation updated successfully!');
        setEditing(false);
        setEditId(null);
      } else {
        const user = localStorage.getItem('userId');
        await axios.post(`http://localhost:5000/api/reservations`, { ...formValues, user });
        setSuccessMessage('Reservation added successfully!');
      }
      setFormValues({ username: '', age: '' });
      getReservations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        {/* <Header/>
        <SideNav/> */}
      < HeaderSignedInClient/>
  

<div className="slider-area2">
  <div className="slider-height2 d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="hero-cap hero-cap2 pt-70">
            <h2>Coachings</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <h1>Coachings List</h1>
  <table>
    <thead>
      <tr>
        <th>username</th>
        <th>age</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {reservations.map((reservation) => (
        <tr key={reservation._id}>
          <td>{reservation.username}</td>
          <td>{reservation.age}</td>
          <td>


               <button onClick={() => handleEdit(reservation._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button> 
  <button
    className={styles.delete}
    onClick={() => handleDelete(reservation._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {/* <h2>{editing ? 'Edit Reservation' : 'Add Reservation'}</h2>  */}
   <form onSubmit={handleFormSubmit} encType="multipart/form-data" className={styles.formcontainer}>


    <div>
      <label htmlFor="username">username:</label>
      <input
        type="text"
        id="username"
        value={formValues.username}
        onChange={(e) =>
          setFormValues({ ...formValues, username: e.target.value })
        }
      />
    </div>
     <div>
      <label htmlFor="age">age:</label>
      <input
        type="text"
        id="age"
        value={formValues.age}
        onChange={(e) =>
          setFormValues({ ...formValues, age: e.target.value })
        }
      />
    </div>  
    <button type="submit">{editing ? 'Update' : 'Add'}</button>
    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    {editing && (
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    )}
  </form> 
 < FooterFront/>
  {/* <Footer/> */}
</div>
);
};

export default requireAuth(ListReservation);



