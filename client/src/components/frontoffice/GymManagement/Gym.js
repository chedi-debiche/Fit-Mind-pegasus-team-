import React, { useState, useEffect } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import GymFront from './GymFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser';
import axios from "axios"



function Gyms() {
  const [localisation, setLocalisation] = useState("");
  const [services, setService] = useState("");
  const [name, setName] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Appeler l'API pour récupérer la liste des gyms correspondant à la localisation entrée
  };





  function handleLocalisationChange(event) {
    setLocalisation(event.target.value);
  }
  async function handleSearch(event) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:5000/api/gyms/findbyloc/${localisation}`);
    setGyms(response.data);
  }



 /* function handleServiceChange(event) {
    setService(event.target.value);
  }
  async function handleSearch(event) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:5000/api/gyms/findbyService/${services}`);//non
    setGyms(response.data);
  }



  function handleNameChange(event) {
    setName(event.target.value);
  }
  async function handleSearch(event) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:5000/api/gyms/findbyName/${name}`);//non
    setGyms(response.data);
  }*/


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
      <form onSubmit={handleSearch}>
  
      

     
      <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
    
        <div style={{ border: "1px solid black", padding: "10px", borderRadius: "15px" }}>
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
      
      
      </div>
      </section>
      

  
  
      



      
      </form>


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
