import React, { useState, useEffect } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import GymFront from './GymFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser'



function Gyms() {
  const [gyms, setGyms] = useState([]);
  const token=localStorage.getItem('token');

  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch('http://localhost:5000/api/gyms/getAll');
      const data = await response.json();
      setGyms(data);
    }
    fetchGyms();
  }, []);

  

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
