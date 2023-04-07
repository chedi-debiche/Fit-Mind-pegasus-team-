import React, { useState, useEffect } from 'react';
import HeaderCoaches from '../shared/HeaderCoaches';
import FooterFront from '../shared/FooterFront';
import CoachingCard from './CoachingCard';
import requireAuth from '../authentification/requireAuth';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating-stars-component';
import styles from './styles.css';
//  import i18n from "i18next";
//  import { initReactI18next } from "react-i18next";

 




function Coachings() {
  const [coachings, setCoachings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [ratings, setRatings] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  

  useEffect(() => {
    async function fetchCoachings() {
      const response = await fetch('http://localhost:5000/api/coachings');
      const data = await response.json();
      setCoachings(data);
    }
    fetchCoachings();
  }, []);

  const filteredCoachings = coachings.filter((coaching) => {
    if (selectedCategory === '') {
      return true; // Show all coachings if no category is selected
    }
    return coaching.category === selectedCategory;
  }).filter((coaching) =>
    coaching.nameCoaching.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCoachings = filteredCoachings.sort((a, b) => {
    const ratingA = ratings[a._id] || 0;
    const ratingB = ratings[b._id] || 0;
    return ratingB - ratingA;
  });

  const offset = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(sortedCoachings.length / itemsPerPage);
  const currentPageCoachings = sortedCoachings.slice(offset, offset + itemsPerPage);
  

  async function handleRating(coachingId, rating) {
    try {
      const response = await fetch(`http://localhost:5000/api/coachings/${coachingId}/rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
      });
      const data = await response.json();
      const newRatings = { ...ratings };
      newRatings[coachingId] = rating;
      setRatings(newRatings);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePageClick({ selected: selectedPage }) {
    setPageNumber(selectedPage);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    
    <div className={darkMode ? 'dark-mode' : ''}>
    
      <HeaderCoaches />
      
     
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>List of Coaches</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchbar"
          />
          <i className="fa fa-search search-icon"></i>
        </div>
      </div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All categories</option>
        <option value="sport">Sport </option>
        <option value="psychologist">Psychologist</option>
     </select>


      <div className="row">
        {currentPageCoachings.map((coaching) => (
          <div className="col-md-4 mb-4" key={coaching._id}>
            <CoachingCard coaching={coaching} />
            <Rating
          count={5}
          size={24}
          activeColor="#ffd700"
          value={coaching.rating || 0} // Pass the initial rating value from the coaching object
          onChange={(rating) => {
            handleRating(coaching._id, rating); // Pass the new rating value to the handleRating function
          }}
        />

          </div>
        ))}
      </div>

      <ReactPaginate
  previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
  nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
  pageCount={pageCount}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  previousLinkClassName={'previous-page'}
  nextLinkClassName={'next-page'}
  disabledClassName={'pagination-disabled'}
  activeClassName={'pagination-active'}
  pageClassName={'pagination-item'}
  pageLinkClassName={'pagination-link'}
/>

<button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>

      <FooterFront />
     
    </div>
    
  );
}

export default requireAuth(Coachings);
