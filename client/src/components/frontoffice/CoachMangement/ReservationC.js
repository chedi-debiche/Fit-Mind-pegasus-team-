import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import FooterFront from "../shared/FooterFront";
import { useParams } from 'react-router-dom';

const ReservationC = (props) => {
  const { coachingId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [formValues, setFormValues] = useState({
    username: '',
    age: '',
     emailuser:'',
     phoneuser:'',
    reservationdate:''
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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coaching = await axios.get(`http://localhost:5000/api/coachings/${coachingId}`);
      const start = new Date(coaching.data.start);
      const end = new Date(coaching.data.end);
      const reservationdate = new Date(formValues.reservationdate);
  
      if (reservationdate < start || reservationdate > end) {
        setError(`La date de réservation doit être comprise entre le ${start.toLocaleDateString()} et le ${end.toLocaleDateString()} !!`);
        return;
      }
  
      const userId = localStorage.getItem('userId');
      const user = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log(user.data);
      const { firstName, lastName, phone, email } = user.data;
   
  
      const reservation = {
        username: `${firstName} ${lastName}`,
        age: formValues.age,
        reservationdate: formValues.reservationdate,
        phoneuser: phone,
        emailuser: email,
        user: userId,
        coaching: coachingId
      };
  
      if (editing) {
        await axios.patch(`http://localhost:5000/api/reservations/${editId}`, reservation);
        setEditing(false);
      } else {
        await axios.post(`http://localhost:5000/api/reservations/${coachingId}`, reservation);
        setSuccessMessage('Votre réservation a été ajoutée avec succès!');
      }
      setFormValues({
        username: '',
        age: '',
        reservationdate: '',
        phoneuser: '',
        emailuser: ''
      });
    } catch (error) {
      console.error(error);
      setError('Une erreur est survenue lors de la soumission du formulaire.');
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
          <td>{reservation.reservationdate}</td>
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
  <h2>{editing ? 'Edit Reservation' : 'Add Reservation'}</h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formcontainer}>


    {/* <div>
      <label htmlFor="username">username:</label>
      <input
        type="text"
        id="username"
        value={formValues.username}
        onChange={(e) =>
          setFormValues({ ...formValues, username: e.target.value })
        }
      />
    </div>  */}
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
    <div>
      <label htmlFor="reservationdate">reservationdate:</label>
      <input
        type="date"
        id="reservationdate"
        value={formValues.reservationdate}
        onChange={(e) =>
          setFormValues({ ...formValues, reservationdate: e.target.value })
        }
      />
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

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

export default requireAuth(ReservationC);



