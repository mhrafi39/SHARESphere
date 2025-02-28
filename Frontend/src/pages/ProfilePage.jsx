import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/ProfileFeed";
import PostDetails from "../components/PostDetails";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User not logged in");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:4000/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handlePostClick = (post) => setSelectedPost(post);
  const handleBackToPosts = () => setSelectedPost(null);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setNewProfilePic(URL.createObjectURL(file)); // Preview image before upload
    const formData = new FormData();
    formData.append("profilePic", file);

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/update-profile-pic",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      setUser((prevUser) => ({ ...prevUser, profilePic: response.data.profilePic }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-page">
      {selectedPost ? (
        <PostDetails post={selectedPost} onBack={handleBackToPosts} />
      ) : (
        <>
          <div className="hamburger-icon" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className={`middle-section ${showSidebar ? "sidebar-open" : ""}`}>
            <div className="profile-header">
              <div className="profile-banner"></div>
              <div className="profile-info">
                <label htmlFor="profilePicUpload" className="profile-pic-label">
                  <img
                    src={newProfilePic || user.profilePic || "default-profile.png"}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <input
                    type="file"
                    id="profilePicUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProfilePicChange}
                  />
                </label>
                <h1>{user.firstName} {user.lastName}</h1>
                <p className="profile-bio">{user.bio || "No bio available."}</p>
                <div className="profile-stats">
                  <span><strong>Email:</strong> {user.emailOrPhone}</span>
                  <span><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</span>
                  <span><strong>Rating:</strong> {user.rating || "N/A"} ★</span>
                </div>
                {uploading && <p>Uploading...</p>}
              </div>
            </div>

            <div className="photos-section">
              <h2>Photos</h2>
              <div className="photos-grid">
                {posts.filter((post) => post.image).map((post) => (
                  <img key={post._id} src={post.image} alt="User post" className="user-photo" />
                ))}
              </div>
            </div>

            <div className="posts-section">
              <h2>Posts</h2>
              {posts.map((post) => (
                <div key={post._id} onClick={() => handlePostClick(post)} className="post-container">
                  <Post
                    author={post.author}
                    time={post.time}
                    title={post.title}
                    content={post.content}
                    type={post.type}
                    image={post.image}
                    category={post.category}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={`right-section ${showSidebar ? "show" : ""}`}>
            <h2>Settings & Privacy</h2>
            <ul className="settings-list">
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
              <li><Link to="/TermsofService">Terms Of Service</Link></li>
              <li><Link to="/Help&Support">Help & Support</Link></li>
            </ul>

            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
