// PostSearch.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../pages/SearchResults'; // Import the SearchResults component

const PostSearch = () => {
  const location = useLocation();
  const { searchResults = [], searchQuery = '' } = location.state || {}; // Get search results from navigation state

  return (
    <div className="home-page">
      <div className="main-content">

        {/* Newsfeed Section */}
        <section className="newsfeed">
          <div className="post-section">
            <SearchResults searchResults={searchResults} /> {/* Use the SearchResults component */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostSearch;