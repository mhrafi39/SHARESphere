import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Post.css';

const PostPage = () => {
  const { id } = useParams();
  const post = {
    id: 1,
    author: { name: 'John Doe', profilePic: 'prf.jpeg' },
    time: '2 hours ago',
    title: 'Looking for a Laptop',
    content: 'Hi everyone, I need a laptop for a few days. Please let me know if anyone is willing to lend it.',
    type: 'Lend',
    image: 'p.jpeg',
  };

  return (
    <div className="post-page">
      <div className="post-header">
        <img src={post.author.profilePic} alt="Profile" className="profile-pic" />
        <div className="post-author">
          <span className="author-name">{post.author.name}</span>
          <span className="post-time">{post.time}</span>
        </div>
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="post-image" />}
      <div className="post-footer">
        <div className="post-type">
          <strong>Type:</strong> <span className="resource-type">{post.type}</span>
        </div>
        <div className="post-actions">
          <button className="share-btn">Share</button>
          <button className="comment-btn">Comment</button>
          <button className="message-btn">Message</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;