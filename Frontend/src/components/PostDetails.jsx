import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PostDetails.css";

const PostDetails = ({ post, onBack }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${post._id}`);
        setComments(response.data.comments || []); // Ensure comments is an array
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchComments();
  }, [post._id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:4000/posts/${post._id}/comments`,
          { text: newComment },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        setComments([...comments, response.data.comment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="post-details">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Posts
      </button>
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="post-image" />}
        <div className="post-meta">
          <span>
            Posted by {post.author.name} • {post.time}
          </span>
        </div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Comments</h3>
        <div className="comment-input">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
        <div className="comments-list">
          {comments.length === 0 ? (
            <div>No comments yet. Be the first to comment!</div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-author">
                  {comment.author.firstName} {comment.author.lastName}
                </div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-time">
                  {new Date(comment.time).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;