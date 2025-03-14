import React from 'react';
import { FaBullhorn, FaShare, FaComment, FaEnvelope } from 'react-icons/fa';

const Post = ({ author, time, title, content, type, image, price, category }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={author.profilePic} alt="Profile" className="profile-pic" />
        <div className="post-author">
          {/* Display first name and last name */}
          <span className="author-name">
            {author.firstName} {author.lastName}
          </span>
          <span className="post-time">{time}</span>
        </div>
      </div>
      <h3>
        <FaBullhorn /><span>{category === 'community' ? 'Community Post' : 'Requested Resource'}: {title}</span> 
      </h3>
      <p>{content}</p>
      {image && <img src={image} alt="Post" className="post-image" />}
      <div className="post-footer">
        <div className="post-type">
          <strong>Type:</strong> <span className="resource-type">{type}</span>
        </div>
        {price && (
          <div className="post-price">
            <strong>Price:</strong> {price}
          </div>
        )}
        <div className="post-actions">
          <button className="share-btn"><FaShare /> Share</button>
          <button className="comment-btn"><FaComment /> Comment</button>
          <button className="message-btn"><FaEnvelope /> Message</button>
        </div>
      </div>
    </div>
  );
};

export default Post;