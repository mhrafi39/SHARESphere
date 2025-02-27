import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Post from "../components/ProfileFeed";
import PostDetails from "../components/PostDetails";
import "../styles/Profile.css";

const ProfilePage = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:4000/profile/67c08e54be901809c834b485`);
        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handlePostClick = (post) => setSelectedPost(post);
  const handleBackToPosts = () => setSelectedPost(null);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
                <img src={user.profilePic || "default-profile.png"} alt="Profile" className="profile-pic" />
                <h1>{user.firstName} {user.lastName}</h1>
                <p className="profile-bio">{user.bio || "No bio available."}</p>
                <div className="profile-stats">
                  <span><strong>Email:</strong> {user.emailOrPhone}</span>
                  <span><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</span>
                  <span><strong>Rating:</strong> {user.rating || "N/A"} ★</span>
                </div>
              </div>
            </div>

            <div className="photos-section">
              <h2>Photos</h2>
              <div className="photos-grid">
                {posts.filter((post) => post.image).map((post) => (
                  <img key={post._id} src={post.image} alt={`Post by ${post.author.firstName}`} className="user-photo" />
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

            <button className="logout-button" onClick={() => alert("Logged out!")}>
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
