import React from 'react';
import './EducatorDashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const EducatorDashboard = () => {
    return (
        <div className="educator-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Educator Dashboard</h3>
                <ul>
                    <li>
                        <a href="/educator/courses">
                            <i className="bi bi-journal-code"></i> Manage Courses
                        </a>
                    </li>
                    <li>
                        <a href="/educator/assignments">
                            <i className="bi bi-file-earmark-text"></i> Manage Assignments
                        </a>
                    </li>
                    <li>
                        <a href="/educator/study-plans">
                            <i className="bi bi-calendar-check"></i> Manage Study Plans
                        </a>
                    </li>
                    <li>
                        <a href="/logout">
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="header">
                    <h2>Welcome, Educator</h2>
                    <p>Here you can manage courses, assignments, and study plans for your students.</p>
                </header>

                <section className="dashboard-cards">
                    <div className="card">
                        <h3>10 Courses</h3>
                        <p>Total courses you are managing.</p>
                        <a href="/educator/courses" className="btn">
                            View Courses
                        </a>
                    </div>
                    <div className="card">
                        <h3>25 Assignments</h3>
                        <p>Assignments created for students.</p>
                        <a href="/educator/assignments" className="btn">
                            Manage Assignments
                        </a>
                    </div>
                    <div className="card">
                        <h3>8 Study Plans</h3>
                        <p>Study plans designed for students.</p>
                        <a href="/educator/study-plans" className="btn">
                            View Study Plans
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EducatorDashboard;
