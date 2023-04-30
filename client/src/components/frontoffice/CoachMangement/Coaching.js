import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
// import { Button } from '@material-ui/core';
// import SideNav from "../sharedBack/SideNav";
 import HeaderCoaches from "../shared/HeaderCoaches";
 import FooterFront from "../shared/FooterFront";
//djo


const Coaching = (props) => {
 // ken bel props jarrabha kif tna7i commentaire taa id user fel form data const Coaching = (props) => {
  // console.log(props);
  //const [nameCoach, setNameCoach] = useState('');
  const [coachings, setCoachings] = useState([]);
  const [formValues, setFormValues] = useState({
    nameCoaching: '',
    nameCoach: '',
    description: '',
    image: '',
    category:'',
    // availability:{
      start :'',
      end: ''
    // },
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getCoachings();
  }, []);

  

  const getCoachings = async () => {
    try {
      const user = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/coachings/spesific?user=${user}`);
      setCoachings(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const userId = localStorage.getItem('userId');
      formData.append('user', userId); // Add the user ID to the form data
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const user = response.data;
      const nameCoach = `${user.firstName} ${user.lastName}`;
      formData.append('nameCoach', nameCoach);
      formData.append('nameCoaching', formValues.nameCoaching);
     // formData.append('nameCoach', formValues.nameCoach);
      formData.append('description', formValues.description);
      formData.append('image', formValues.image);
      formData.append('rating', 0);
      formData.append('category', formValues.category);
      formData.append('start', formValues.start);
      formData.append('end', formValues.end);
      // formData.append('availability.start', formValues.start);
      // formData.append('availability.end', formValues.end);

    
    

      
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
    //       availability:{
     start :'',
      end: ''
    // },
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
    <div>
        {/* <Header/>
        <SideNav/> */}
      < HeaderCoaches/>
  

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


               <button onClick={() => handleEdit(coaching._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button> 
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
  <h2>{editing ? 'Edit Coaching' : 'Add Coaching'}</h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formcontainer}>
  <div>
  <label htmlFor="category">Category:</label>
  <div>
    <input
      type="radio"
      id="sport"
      name="category"
      value="sport"
      checked={formValues.category === "sport"}
      onChange={(e) =>
        setFormValues({ ...formValues, category: e.target.value })
      }
    />
    <label htmlFor="sport">Sport</label>
  </div>
  <div>
    <input
      type="radio"
      id="psychologist"
      name="category"
      value="psychologist"
      checked={formValues.category === "psychologist"}
      onChange={(e) =>
        setFormValues({ ...formValues, category: e.target.value })
      }
    />
    <label htmlFor="psychologist">Psychologist</label>
  </div>
</div>

    <div>
      <label htmlFor="nameCoaching">nameCoaching:</label>
      <input
        type="text"
        id="nameCoaching"
        value={formValues.nameCoaching}
        onChange={(e) =>
          setFormValues({ ...formValues, nameCoaching: e.target.value })
        }
      />
    </div>
     {/* <div>
      <label htmlFor="nameCoach">nameCoach:</label>
      <input
        type="text"
        id="nameCoach"
        value={formValues.nameCoach}
        onChange={(e) =>
          setFormValues({ ...formValues, nameCoach: e.target.value })
        }
      />
    </div>   */}
    <div>
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={formValues.description}
        onChange={(e) =>
          setFormValues({ ...formValues, description: e.target.value })
        }
      />
    </div>
    <div>
      <label htmlFor="start">start:</label>
      <input
        type="date"
        id="start"
        value={formValues.start}
        onChange={(e) =>
          setFormValues({ ...formValues, start: e.target.value })
        }
      />
    </div>
    <div>
      <label htmlFor="end">end:</label>
      <input
        type="date"
        id="end"
        value={formValues.end}
        onChange={(e) =>
          setFormValues({ ...formValues, end: e.target.value })
        }
      />
    </div>

    {/* <div>
  <label htmlFor="availabilityStart">Date de début:</label>
  <input
    type="date"
    id="availabilityStart"
    value={formValues.availability.start}
    onChange={(e) =>
      setFormValues({
        ...formValues,
        availability: {
          ...formValues.availability,
          start: e.target.value,
        },
      })
    }
  />
</div>

<div>
  <label htmlFor="availabilityEnd">Date de fin:</label>
  <input
    type="date"
    id="availabilityEnd"
    value={formValues.availability.end}
    onChange={(e) =>
      setFormValues({
        ...formValues,
        availability: {
          ...formValues.availability,
          end: e.target.value,
        },
      })
    }
  />
</div> */}


    {/* <div>
      <label htmlFor="start">start:</label>
      <input
        type="date"
        id="start"
        value={formValues.start}
        onChange={(e) =>
          setFormValues({ ...formValues, start: e.target.value })
        }
      />
    </div>


    <div>
      <label htmlFor="end">end:</label>
      <input
        type="date"
        id="end"
        value={formValues.end}
        onChange={(e) =>
          setFormValues({ ...formValues, end: e.target.value })
        }
      />
    </div> */}

    <div>
       <label htmlFor="image">upload product picture</label> 
      <input
        type="file"
        id="image"
        className={styles.filedesign}
        onChange={(e) => {
          setFormValues({ ...formValues, image: e.target.files[0] });
        }}
      />
    </div>
    <button type="submit">{editing ? 'Update' : 'Add'}</button>
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

export default requireAuth(Coaching);