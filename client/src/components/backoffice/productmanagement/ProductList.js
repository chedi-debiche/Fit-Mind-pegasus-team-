import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from '@material-ui/core';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('price', formValues.price);
      formData.append('quantity', formValues.quantity);
      formData.append('image', formValues.image);
      
      if (editing) {
        await axios.patch(`http://localhost:5000/api/products/${editId}`, formData);
        setEditing(false);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      setFormValues({
        name: '',
        description: '',
        price: '',
        image: '',
        quantity: '',
      });
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setFormValues(response.data);
      setEditing(true);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Header/>
        <SideNav/>
  <h1>Product List</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Image</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>
            <img
        src={`http://localhost:5000/uploads/${product.image}`}
//   alt={`Image of ${product.name}`}
              width="100"
            />
          </td>
          <td>{product.quantity}</td>
          <td>


               <button onClick={() => handleEdit(product._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button> 
  <button
    className={styles.delete}
    onClick={() => handleDelete(product._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formcontainer}>
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={formValues.name}
        onChange={(e) =>
          setFormValues({ ...formValues, name: e.target.value })
        }
      />
    </div>
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
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={formValues.price}
        onChange={(e) =>
          setFormValues({ ...formValues, price: e.target.value })
        }
      />
    </div>
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
    <div>
      <label htmlFor="quantity">Quantity:</label>

      <input
        type="number"
        id="quantity"
        value={formValues.quantity}
        onChange={(e) =>
          setFormValues({ ...formValues, quantity: e.target.value })
        }
      />
    </div>
    <button type="submit">{editing ? 'Update' : 'Add'}</button>
    {editing && (
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    )}
  </form>
  <Footer/>
</div>
);
};

export default ProductList;



