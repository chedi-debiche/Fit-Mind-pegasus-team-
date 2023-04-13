import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from '@material-ui/core';
// import SideNav from "../sharedBack/SideNav";
 import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";



const Coaching = () => {
  const [coachings, setCoachings] = useState([]);
  const [formValues, setFormValues] = useState({
    nameCoaching: '',
    nameCoach: '',
    description: '',
    image: '',
   // category:'',
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getCoachings();
  }, []);

  

  const getCoachings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/coachings');
      setCoachings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nameCoaching', formValues.nameCoaching);
      formData.append('nameCoach', formValues.nameCoach);
      formData.append('description', formValues.description);
      formData.append('image', formValues.image);
      formData.append('rating', 0);
      formData.append('category', formValues.category);
      
      if (editing) {
        await axios.patch(`http://localhost:5000/api/coachings/${editId}`, formData);
        setEditing(false);
      } else {
        await axios.post('http://localhost:5000/api/coachings', formData);
      }
      setFormValues({
        nameCoaching: '',
        nameCoach: '',
        description: '',
        image: '',
       // category:'',
      });
      getCoachings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/coachings/${id}`);
      getCoachings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/coachings/${id}`);
      setFormValues(response.data);
      setEditing(true);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
         <Header/>
        <SideNav/> 
      {/* < HeaderCoaches/> */}
  


  <h1>Coachings List</h1>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>nameCoaching</th>
        <th>nameCoach</th>
        <th>description</th>
        <th>image</th>
        <th>category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {coachings.map((coaching) => (
        <tr key={coaching._id}>
          <td>{coaching.nameCoaching}</td>
          <td>{coaching.nameCoach}</td>
          <td>{coaching.description}</td>
          <td>
            <img
        src={`http://localhost:5000/uploads/${coaching.image}`}
//   alt={`Image of ${product.name}`}
              width="100"
            />
          </td>
          <td>{coaching.category}</td>
          <td>


               {/* <button onClick={() => handleEdit(coaching._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button>  */}
  <button
    className={styles.delete}
    onClick={() => handleDelete(coaching._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
 
 {/* < FooterFront/> */}
  <Footer/> 
</div>
);
};

export default Coaching;



