import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styles from './styles.css';

function ProductCard({ product }) {
//   const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleAddToCart = () => {
    // TODO: implement add to cart functionality
  };

  return (
    <div className="product-card" style={{ backgroundColor: 'white' }}>
      <img
        className="card-img-top"
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={`Image of ${product.name}`}
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
          {product.name}
        </h5>
        {/* <p className="card-text" style={{ textAlign: 'left' }}>
          {product.description}
        </p> */}
        {/* <p className="card-text" style={{ textAlign: 'left' }}>{`Price : $${product.price}`}</p> */}
        {/* <p className="card-text" style={{ textAlign: 'left' }}>{`Quantity: ${product.quantity}`}</p> */}
        {!showDetails && (
          <button
            className="genric-btn success circle"
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
            <p>{`Quantity: ${product.quantity}`}</p>
            <p>{`Description: ${product.description}`}</p>
            <button
              className="genric-btn danger circle"
              style={{
                fontSize: '20px',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
