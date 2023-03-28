import React, { useState } from 'react';
import styles from './styles.css';
import requireAuth from '../authentification/requireAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ProductCard({ product, onAddToCart,props }) {
  const [showDetails, setShowDetails] = useState(false);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const priceForStripe = product.price * 100;
const publishableKey = 'pk_test_51MqQubH8gtFTSlJTmkJ77QzT7tJHebL75910DWD3ahqR46duS0bNe6rkqVrhJrTVBW3bkKXxWMYViErJB7mDUtFC00Rzb2caZ5'
  // const { userId } = props;
  const MySwal = withReactContent(Swal);


  const handleShowDetails = () => {
    setShowDetails(true);
  };


  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };


  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/api/products/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };


  const handleAddToCart = async () => {
    try {

      const userId = localStorage.getItem('userId');

      const response = await axios.post('http://localhost:5000/api/cart', { userId, productId, quantity });
      console.log(response.data);
      // do something with the response
    } catch (error) {
      console.error(error);
    }
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
        {!showDetails && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="genric-btn primary radius"
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
          </div>
        )}
        {showDetails && (
          <div>
            <h5>Product details : </h5>

            <p>{`Price: $${product.price}`}</p> 
            <p>{`Quantity: ${product.quantity}`}</p>
            <p>{`Description: ${product.description}`}</p>
            {/* <button
              className="genric-btn danger radius"
              style={{
                fontSize: '20px',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button> */}
            <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
       token={payNow}
             />



          </div>
        )}
      </div>
    </div>
  );
}

export default requireAuth(ProductCard);
