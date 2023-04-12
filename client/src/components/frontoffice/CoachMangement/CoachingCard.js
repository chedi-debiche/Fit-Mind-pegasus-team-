import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styles from './styles.css';
//import { Link, useHistory } from 'react-router-dom';
import requireAuth from '../authentification/requireAuth';

function CoachingCard({ coaching }) {
 //const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  // const handleAddToCart = () => {
  //   history.push('/Reservationc');
  // };

  return (
    <div className="coach-card" style={{ backgroundColor: 'white' }}>
      <img
        className="card-img-top"
        src={`http://localhost:5000/uploads/${coaching.image}`}
        alt={`Image of ${coaching.nameCoaching}`}
        style={{ width: 'auto', height: '300px' }}
      />
      <div className="card-body">
        <h5
          className={styles.title}
          style={{
            textAlign: 'center',
            fontSize: '2em',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {coaching.nameCoaching}
        </h5>
        {/* <p className="card-text" style={{ textAlign: 'left' }}>
          {product.description}
        </p> */}
        {/* <p className="card-text" style={{ textAlign: 'left' }}>{`Price : $${product.price}`}</p> */}
        {/* <p className="card-text" style={{ textAlign: 'left' }}>{`Quantity: ${product.quantity}`}</p> */}
        {!showDetails && (
          <button
            className="genric-btn primary circle"
            style={{
              fontSize: '15px',
              padding: '5px 10px',
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={handleShowDetails}
          >
            Show Details
          </button>
        )}
        {showDetails && (
          <div>
            <h5>Details</h5>
            {/* <p>{`Name: ${product.name}`}</p>
            <p>{`Price: $${product.price}`}</p> */}
            <p>{`Description: ${coaching.description}`}</p>
            <p>{`Disponibilité: ${new Date(coaching.start).toLocaleDateString()} - ${new Date(coaching.end).toLocaleDateString()}`}</p>

            <h5>{`Name of the coach: ${coaching.nameCoach}`}</h5>
             <a href={`/Reservationc/${coaching._id}`} class="reservation-link">Réserver</a> 
            {/* <a href="/Reservationc" class="reservation-link">Réserver</a> */}




            <br></br>
            {/* <button   className="btn btn-primary"
              style={{
                fontSize: '15px',
                padding: '0px 10px',
                display: 'flex',
                justifyContent: 'center',
              }}>Envoyer un message </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default requireAuth(CoachingCard);