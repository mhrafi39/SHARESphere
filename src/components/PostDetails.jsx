import React, { useState } from 'react';
import '../styles/PostDetails.css';

const PostDetails = ({ post, onBack }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'Alice', text: 'Great post!', time: '1h ago' },
    { id: 2, author: 'Bob', text: 'Thanks for sharing!', time: '2h ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Current User', // Replace with logged-in user's name
        text: newComment,
        time: 'Just now',
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

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
          <span>Posted by {post.author.name} • {post.time}</span>
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
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-time">{comment.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;