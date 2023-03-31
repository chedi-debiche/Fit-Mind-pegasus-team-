import React,{useState,useEffect} from 'react'
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt,faCheck } from '@fortawesome/free-solid-svg-icons';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./styles.css";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = loadStripe('pk_test_51MqwXKLtZDUJknUFqrT9QWqseSlznuwfUJLZb7InHzAZ2EHNxPVqgYmxcy9CE0r96wchlhTvr6QnLWp1vA1kxIWJ00e4rQ4gk4');
function GymDetails () {
  const [gyms, setGyms] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMorePics, setShowMorePics] = useState(false);
  // const [showSubscription, setShowSubscriptions] = useState(false);  
  const [rating, setRating] = useState(0);
  const idu=localStorage.getItem('userId');

  // const [isProcessing, setIsProcessing] = useState(false);
  // const stripe = useStripe();
  // const elements = useElements();



  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsProcessing(true);

  //   const { paymentMethod, error } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: elements.getElement(CardElement),
  //   });

  //   if (error) {
  //     console.log(error);
  //     setIsProcessing(false);
  //     return;
  //   }

  //   const response = await fetch('http://localhost:5000/api/gyms/create-subscription', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       customerId: 'cus_NcDBXNnuFRRf0d',
  //       paymentMethodId: paymentMethod.id,
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.log('Error creating subscription:', response);
  //     setIsProcessing(false);
  //     return;
  //   }

  //   setIsProcessing(false);
  //   console.log('Subscription created successfully:', response);
  // };



  // const [showMap, setShowMap] = useState(false);
  const {id}=useParams()

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex<4 ? (prevIndex + 1) : prevIndex=0);
  };


  const handleMorePicsClick = () => {
    setShowMorePics(true);
  }
  const handleCatchPicsClick = () => {
    setShowMorePics(false);
  }


  // const handleSubscribe = () => {
  //   setShowSubscriptions(true);
  // }

  const handleRatingChange = async(value) => {
    setRating(value);

  };

  // try {
  //   const response =await axios.put(`http://localhost:5000/api/gyms/rating/${id}`, { rating });
  //   setGyms(response.data);
  // } catch (error) {
  //   console.log(error);
  // }

  const submitRating = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/gyms/rating/${id}`, { rating });
      // setGyms(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  

  // const toggleMap = () => {
  //   setShowMap(!showMap);
  // };

  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch(`http://localhost:5000/api/gyms/getById/${id}`);
      const data = await response.json();
      setGyms(data);
    }
    fetchGyms();
  }, [id]);
  useEffect(() => {
    const timer = setTimeout(() => {
      nextPhoto();
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPhotoIndex]);
  
  return (
    <div>
{/* <HeaderFront/> */}
<main style={{ background: 'black' }}>
  {/*? Hero Start */}
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap hero-cap2 pt-70">
              <h2>{gyms.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
  {/* Services End */}
  {/*? About Area-2 Start */}
  <section className="about-area2 fix pb-padding pt-50 pb-80">
    <div className="support-wrapper align-items-center">
      <div className="right-content2 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
        {/* img */}
        <div className="right-img">
          {gyms.photo && gyms.photo.length > 0 && <img src={`http://localhost:5000/uploads/${gyms.photo[currentPhotoIndex]}`} alt={gyms.name} />}
        </div>
      </div>
      
      <div className="left-content2">
        {/* section tittle */}
        {showMorePics ? (
          <div>
            <div className="photos-grid">
            {gyms.photo.map((photo) => (
              <img key={photo} src={`http://localhost:5000/uploads/${photo}`} alt="Gym" />
              
            ))}
          </div>
          <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} onClick={handleCatchPicsClick} >Catch pics</Link>
          </div>
        
        

        ):(
        <div className="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
          <div className="front-text">
            <h2 className>{gyms.name}</h2>
            <p>{gyms.description}</p>
            <p className="mb-40">{gyms.services}</p>
            <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} onClick={handleMorePicsClick} >All pics</Link>
            <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} to={`/subscribeGym/${id}/${idu}`} >Subscribe</Link>
            {/* <button  className="border-btn" style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
              More photos
            </button> */}
                    

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '20px'  }} >
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    size={18}
                  />
                </label>
              );
            })}
          </div>
          {/* <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} onClick={submitRating} >Rate</Link> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link style={{ backgroundColor: 'yellow', borderRadius: '4px', padding: '10px 18px', color: 'black' }} onClick={submitRating}>Rate</Link>
          </div>




          
          </div>
        </div>
        )}
      </div>
      
    </div>
  </section>

 

 
  <section className="services-area">
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
            <div className="features-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'red' , fontSize: '40px' , cursor: 'pointer'}} />
            </div>
            <div className="features-caption">
              <h3>Location</h3>
              <p>{gyms.localisation}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
            <div className="features-icon">
              <FontAwesomeIcon icon={faPhoneAlt} style={{ color: 'red' , fontSize: '40px' }} />
            </div>
            <div className="features-caption">
              <h3>Phone</h3>
              <p>(90) 277 278 2566</p>
              <p>  (78) 267 256 2578</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
            <div className="features-icon">
              <FontAwesomeIcon icon={faEnvelope} style={{ color: 'red' , fontSize: '40px' }} />
            </div>
            <div className="features-caption">
              <h3>Email</h3>
              <p>pegasus-sport@gmail.com</p>
              <p>fit-mind@pegasus.tn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* {showMap && (
        <MapContainer center={[gyms.lat, gyms.lng]} zoom={13} style={{ height: '400px', marginBottom: '20px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[gyms.lat, gyms.lng]}>
            <Popup>{gyms.name}</Popup>
          </Marker>
        </MapContainer>
      )} */}
</main>
{/* <FooterFront/> */}

      
    </div>
  )
}

export default GymDetails;




















