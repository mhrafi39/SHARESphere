// SearchResults.js
import React from 'react';
import Post from '../components/Post'; // Import the Post component

const SearchResults = ({ searchResults }) => {
  return (
    <div className="search-results">
      {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div key={post._id} className="post-container">
            <Post {...post} /> {/* Use the Post component */}
          </div>
        ))
      ) : (
        <div className="no-posts-message">No posts available.</div>
      )}
    </div>
  );
};

export default SearchResults;