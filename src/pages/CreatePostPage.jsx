import React, { useState } from 'react';
import '../styles/Post.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Lend');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating post:', { title, content, type, image });
    // Add logic to submit the post
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h1>Create a New Post</h1>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Lend">Lend</option>
              <option value="Requested">Requested</option>
              <option value="Free">Free</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <div className="file-upload">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <span className="upload-label">Choose a file</span>
            </div>
          </div>
          <button type="submit" className="submit-btn">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;