import React from 'react';
import './AdminDashboard.css'; // Link the custom CSS file
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <ul className="nav-list">
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin page/ManageUser">Manage Users</Link></li>
                    <li><Link to="/admin/courses">Manage Courses</Link></li>
                    <li><Link to="/admin/assignments">Manage Assignments</Link></li>
                    <li><Link to="/admin/reports">Reports</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome, Admin!</h1>
                    <p>Manage and monitor platform activities.</p>
                </header>

                {/* Summary Cards */}
                <section className="dashboard-summary">
                    <div className="card">
                        <h3>Total Users</h3>
                        <p>1,250</p>
                    </div>
                    <div className="card">
                        <h3>Total Courses</h3>
                        <p>45</p>
                    </div>
                    <div className="card">
                        <h3>Pending Assignments</h3>
                        <p>12</p>
                    </div>
                    <div className="card">
                        <h3>Reports Generated</h3>
                        <p>300</p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions">
                        <button className="action-btn">Add New User</button>
                        <button className="action-btn">Add New Course</button>
                        <button className="action-btn">Generate Report</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;