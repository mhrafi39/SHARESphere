import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/AdminPage.css"; // Import CSS file

const AdminPage = () => {
    const [users, setUsers] = useState([]); // All users with their status
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use useNavigate for redirection

    // Check if the user is an admin
    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                // If no token, redirect to login page
                navigate("/login");
                return;
            }

            try {
                // Verify the token and check if the user is an admin
                const response = await axios.get("http://localhost:4000/check-admin", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.data.isAdmin) {
                    // If not an admin, redirect to home page or a "Not Authorized" page
                    navigate("/home");
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                navigate("/login"); // Redirect to login if token is invalid
            }
        };

        checkAdmin();
    }, [navigate]);

    // Fetch all users with their status
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/admin/all-users", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users");
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchAllUsers();
    }, []);

    // Handle approve/reject action
    const handleApproveReject = async (userId, action) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/admin/approve-user/${userId}`,
                { action },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            toast.success(`User ${action === "approve" ? "approved" : "rejected"} successfully!`);

            // Update the user's status in the local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, adminVerified: action === "approve" } : user
                )
            );
        } catch (error) {
            console.error("Error approving/rejecting user:", error);
            toast.error(`Failed to ${action === "approve" ? "approve" : "reject"} user`);
        }
    };

    // Handle reject with confirmation
    const handleReject = async (userId) => {
        const confirmReject = window.confirm("Are you sure you want to reject this user?");
        if (confirmReject) {
            await handleApproveReject(userId, "reject");
        }
    };

    if (loading) {
        return <p className="loading">Loading users...</p>;
    }

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <h2>All Users</h2>
            {users.length === 0 ? (
                <p className="no-users">No users found</p>
            ) : (
                <div className="user-list">
                    {users.map((user) => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <p><strong>Email/Phone:</strong> {user.emailOrPhone}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p><strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status ${user.adminVerified ? "approved" : "pending"}`}>
                                        {user.adminVerified ? "Approved" : "Pending"}
                                    </span>
                                </p>
                            </div>
                            <div className="nid-passport">
                                <img src={user.nidPassport} alt="NID/Passport" />
                            </div>
                            {!user.adminVerified && (
                                <div className="actions">
                                    <button className="approve-btn" onClick={() => handleApproveReject(user._id, "approve")}>
                                        Approve
                                    </button>
                                    <button className="reject-btn" onClick={() => handleReject(user._id)}>
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default AdminPage;