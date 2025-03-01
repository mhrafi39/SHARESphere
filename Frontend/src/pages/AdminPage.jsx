import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminPage.css"; // Import CSS file

const AdminPage = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch pending users
    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/admin/pending-users");
                setPendingUsers(response.data);
            } catch (error) {
                console.error("Error fetching pending users:", error);
                toast.error("Failed to fetch pending users");
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchPendingUsers();
    }, []);

    // Handle approve/reject action
    const handleApproveReject = async (userId, action) => {
        try {
            const response = await axios.post(`http://localhost:4000/admin/approve-user/${userId}`, { action });
            toast.success(`User ${action === "approve" ? "approved" : "rejected"} successfully!`);
            setPendingUsers(pendingUsers.filter((user) => user._id !== userId)); // Remove user from list
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
        return <p className="loading">Loading pending users...</p>;
    }

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <h2>Pending Users</h2>
            {pendingUsers.length === 0 ? (
                <p className="no-users">No pending users</p>
            ) : (
                <div className="user-list">
                    {pendingUsers.map((user) => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <p><strong>Email/Phone:</strong> {user.emailOrPhone}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p><strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
                            </div>
                            <div className="nid-passport">
                                <img src={user.nidPassport} alt="NID/Passport" />
                            </div>
                            <div className="actions">
                                <button className="approve-btn" onClick={() => handleApproveReject(user._id, "approve")}>
                                    Approve
                                </button>
                                <button className="reject-btn" onClick={() => handleReject(user._id)}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default AdminPage;