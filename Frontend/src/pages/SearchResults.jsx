import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    if (!searchQuery) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null); // Reset errors on new search
      try {
        // Pass the search query as separate parameters
        const response = await fetch(
          `http://localhost:4000/posts/search?category=${searchQuery}&title=${searchQuery}&content=${searchQuery}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data);
        } else {
          setResults([]);
          setError(data.message || "No results found");
        }
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
      }
      setLoading(false);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="search-results">
      <h2>Search Results for "{searchQuery}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length === 0 && !loading && !error && <p>No posts found</p>}
      <ul>
        {results.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>Category: {post.category}</p>
            <p>By: {post.author.firstName} {post.author.lastName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;