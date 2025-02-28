import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Post.css";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("Lend");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("⚠️ You must be logged in to create a post.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("type", type);
        formData.append("category", category);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:4000/posts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("✅ Post created successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("Post creation error:", error.response ? error.response.data : error.message);
            alert("❌ Failed to create post. Try again.");
        }
    };

    return (
        <div className="create-post-page">
            <div className="create-post-container">
                <h1>Create a New Post</h1>
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
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
                        <label>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Upload Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                    </div>
                    <button type="submit" className="submit-btn">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
