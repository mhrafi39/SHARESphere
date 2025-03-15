import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostSearch.css";  // Import the CSS file

const PostSearch = () => {
  // State hooks for filters, posts, and loading state
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState(""); // For post title search
  const [category, setCategory] = useState(""); // For category search
  const [type, setType] = useState(""); // For type search
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [error, setError] = useState(""); // Error handling
  const [page, setPage] = useState(1); // Pagination page state
  const [limit] = useState(7); // Pagination limit per page (can be adjusted)

  // Fetch posts when any filter changes or when page changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        // Construct the query string based on filters
        const queryParams = new URLSearchParams();
        if (title) queryParams.append("title", title);
        if (category) queryParams.append("category", category);
        if (type) queryParams.append("type", type);
        queryParams.append("page", page);
        queryParams.append("limit", limit);

        // Fetch posts from the backend API
        const apiUrl = "http://localhost:4000/api/products"; // Your backend API URL
        const response = await axios.get(`${apiUrl}?${queryParams.toString()}`);
        setPosts(response.data.myData);
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [title, category, type, page, limit]);

  // Handle pagination (previous/next)
  const handlePageChange = (direction) => {
    setPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="post-search-container">
      <h1>Post Search</h1>

      <div className="filter-form">
        {/* Search by Post Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
        />

        {/* Category Dropdown */}
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="news">News</option>
          <option value="lifestyle">Lifestyle</option>
        </select>

        {/* Type Dropdown */}
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">All Types</option>
          <option value="blog">Blog</option>
          <option value="news">News</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display Posts */}
      <ul className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} className="post-item">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>
                <strong>Category:</strong> {post.category}
              </p>
              <p>
                <strong>Type:</strong> {post.type}
              </p>
              <p>
                <strong>Comments:</strong> {post.comments.length}
              </p>
            </li>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(-1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(1)} disabled={posts.length < limit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostSearch;
