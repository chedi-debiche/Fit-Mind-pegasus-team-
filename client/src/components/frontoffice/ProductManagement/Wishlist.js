import React, { useState } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import ProductCard from './ProductCard';
import requireAuth from '../authentification/requireAuth';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Retrieve wishlist from local storage when component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  function addToWishlist(product) {
    // Check if product is already in wishlist
    const index = wishlist.findIndex((item) => item._id === product._id);
    if (index === -1) {
      setWishlist([...wishlist, product]);
    }
  }

  function removeFromWishlist(product) {
    setWishlist(wishlist.filter((item) => item._id !== product._id));
  }

  return (
    <div style={{ background: 'white' }} className="">
      <HeaderFront />

      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Wishlist</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {wishlist.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <ProductCard product={product} />
            <button className="genric-btn circle wishlist-btn" onClick={() => removeFromWishlist(product)}>
              Remove from wishlist
            </button>
          </div>
        ))}
      </div>

      <FooterFront />
    </div>
  );
}

export default requireAuth(Wishlist);
