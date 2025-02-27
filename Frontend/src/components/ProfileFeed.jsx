import React from 'react';
import { FaBullhorn, FaShare, FaComment, FaEdit } from 'react-icons/fa';
import '../styles/Postprf.css';

const ProfileFeed = ({ author, time, title, content, type, image, price, category, onEdit }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={author.profilePic} alt="Profile" className="profile-pic" />
        <div className="post-author">
          <span className="author-name">{author.name}</span>
          <span className="post-time">{time}</span>
        </div>
      </div>

      <h3>
        <FaBullhorn /> {category === 'community' ? 'Community Post' : category === 'resource' ? 'Shared Resource' : 'General Post'}: {title}
      </h3>
      <p>{content}</p>

      {image ? <img src={image} alt="Post" className="post-image" /> : <p className="no-image">No image available</p>}

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
          <button className="share-btn" onClick={() => alert('Shared!')}><FaShare /> Share</button>
          <button className="comment-btn" onClick={() => alert('Comment clicked!')}><FaComment /> Comment</button>
          <button className="edit-btn" onClick={onEdit}><FaEdit /> Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
