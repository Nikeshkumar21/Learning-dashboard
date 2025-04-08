import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role update
  const handleRoleChange = async (id, newRole) => {
    try {
      setUpdatingUserId(id); // Set the loading state for the user being updated
      await axios.put(
        `http://localhost:5001/api/users/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? { ...user, role: newRole } : user))
      );
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Failed to update user role. Please try again.");
      console.error("Error updating user role:", err);
    } finally {
      setUpdatingUserId(null); // Clear the loading state
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      setUpdatingUserId(id); // Set the loading state for the user being deleted
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", err);
    } finally {
      setUpdatingUserId(null); // Clear the loading state
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-users-container">
      <h1 className="manage-users-title">Manage Users</h1>

      {error && <div className="manage-users-error">{error}</div>}

      <div className="manage-users-controls">
        <input
          type="text"
          className="manage-users-search"
          placeholder="Search users by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="manage-users-loading">Loading...</div>
      ) : filteredUsers.length > 0 ? (
        <table className="manage-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="manage-users-role"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={updatingUserId === user._id} // Disable while updating
                  >
                    <option value="Admin">Admin</option>
                    <option value="Educator">Educator</option>
                    <option value="Student">Student</option>
                  </select>
                </td>
                <td>
                  <button
                    className="manage-users-delete"
                    onClick={() => handleDelete(user._id)}
                    disabled={updatingUserId === user._id} // Disable while deleting
                  >
                    {updatingUserId === user._id ? "Processing..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="manage-users-empty">
          {search
            ? "No users match your search."
            : "No users found. Please check back later."}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
