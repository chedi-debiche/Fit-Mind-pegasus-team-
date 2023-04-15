import React, { useState, useEffect } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import GymFront from './GymFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser';
import axios from "axios"
import { Form } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faFilter,faSort } from '@fortawesome/free-solid-svg-icons';
import Rating from "react-rating-stars-component";



function Gyms() {
  const [localisation, setLocalisation] = useState("");
  const [services, setService] = useState("");
  const [name, setName] = useState("");

  const [showIcons,setShowIcons] = useState(true);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const [gyms, setGyms] = useState([]);
  const token=localStorage.getItem('token');

  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch('http://localhost:5000/api/gyms/getAll');
      const data = await response.json();
      setGyms(data);
      console.log(token)
    }
    fetchGyms();
  }, []);



  function handleLocalisationChange(event) {
    setLocalisation(event.target.value);
  }
  async function handleSearch(event) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:5000/api/gyms/findbyloc/${localisation}`);
    setGyms(response.data);
  }

  const handleSearchClick = () => {
    console.log("search clicked")
    setIsSearchClicked(true);
    setIsFilterClicked(false);
    setIsSortClicked(false);
    setShowIcons(false);
  };

  const handleFilterClick = () => {
    setIsSearchClicked(false);
    setIsFilterClicked(true);
    setIsSortClicked(false);
    setShowIcons(false);
  };

  const handleSortClick = () => {
    setIsSearchClicked(false);
    setIsFilterClicked(false);
    setIsSortClicked(true);
    setShowIcons(false);
  };



  const handleSort = (event) => {
    const sortBy = event.target.value;
    const url = `http://localhost:5000/api/gyms/sort/${sortBy}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => setGyms(data));

    setIsSortClicked(false);
    setShowIcons(true);
  };


  const handleFilter = (event) => {
    event.preventDefault();
    // const rating = event.target.elements.rating.value;
  
    fetch(`http://localhost:5000/api/gyms/filter/${minRating}`)
      .then((response) => response.json())
      .then((data) => setGyms(data))
      .catch((error) => console.log(error));
  };

 
  
  


 


  return (
    <div >
       {token ?(
       <>
      <HeaderSignedInClient/>

      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-100">
                  <h2>Gyms</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  
      

     
      <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
        {showIcons && (<div className='row'>
          <div className='features-icon col lg-4 md-4 sm-4' onClick={() => handleSearchClick()}>
            <FontAwesomeIcon icon={faSearch} size="3x" style={{color: 'red'}}/>
          </div>
          <div className='features-icon col lg-4 md-4 sm-4'>
            <FontAwesomeIcon icon={faFilter} size="3x" style={{ marginLeft: '1rem', marginRight: '1rem' ,color: 'red'}} onClick={handleFilterClick} />
          </div>
          <div className='features-icon col lg-4 md-4 sm-4'>
            <FontAwesomeIcon icon={faSort} size="3x" style={{ marginRight: '1rem',color: 'red' }} onClick={handleSortClick} />
          </div>
        </div> )}

      

      

        {isSearchClicked &&(
    
         <div style={{ border: "1px solid black", padding: "10px", borderRadius: "15px" }}>
          <form onSubmit={handleSearch}>
        <label>
          <h1>location :</h1>
          
          <input
            type="text"
            placeholder=" your location"
            value={localisation}
            onChange={handleLocalisationChange}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
        </label>
        <button type="submit" style={{ backgroundColor: "red", color: "white", fontSize: "20px", padding: "10px 20px", borderRadius: "5px", border: "none" }} >find</button>
      </form>
          
      
      </div> )}





            {isSortClicked &&(
          
          <div style={{ border: "1px solid black", padding: "10px", borderRadius: "15px" }}>
            <Form.Group>
              <Form.Label>Sort by:</Form.Label>
              <Form.Control as="select" onChange={handleSort}>
                <option value="default">Default</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-rated">Lowest Rated</option>
              </Form.Control>
            </Form.Group>
      
          </div> )}





          {isFilterClicked &&(
            <div>
          <Rating
            name="min-rating"
            count={5}
            size={24}
            activeColor="#ffd700"
            onChange={(newRating) => setMinRating(newRating)}
          /> 
          <button onClick={handleFilter} style={{ backgroundColor: "red", color: "white", fontSize: "15px", padding: "10px 10px", borderRadius: "15px", border: "none", marginLeft:"20px" }} >Filter</button>
          </div>

          )}


    


      </section>
      

  
  
      



      


      <div className="row">
        {gyms.map((gym) => (
          <div className="col-md-4 mb-4" key={gym._id}>
            <GymFront gym={gym} />
          </div>
        ))}
      </div>

  

      <FooterFront />
      </>
       ):(
        <CheckUser/>
      )
    }
    </div>
  );
}

export default Gyms;
