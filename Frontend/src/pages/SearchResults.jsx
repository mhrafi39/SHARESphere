import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/SearchResults.css"

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    if (!category) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/posts/search?category=${category}`);
        const data = await response.json();

        if (response.ok) {
          setResults(data);
        } else {
          setResults([]);
          setError(data.message || "No results found");
        }
      } catch (err) {
        setError("Failed to fetch results");
      }
      setLoading(false);
    };

    fetchResults();
  }, [category]);

  return (
    <div className="search-results">
      <h2>Search Results for "{category}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
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
