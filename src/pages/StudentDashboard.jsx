import React from 'react';
import './StudentDashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Student Dashboard</h2>
                <ul className="sidebar-menu">
                    <li>
                        <a href="/courses">
                            <i className="bi bi-journal-code"></i> IT Courses
                        </a>
                    </li>
                    <li>
                        <a href="/assignments">
                            <i className="bi bi-file-earmark-text"></i> Assignments
                        </a>
                    </li>
                    <li>
                        <a href="/studyPlans">
                            <i className="bi bi-calendar-check"></i> Study Plans
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
                {/* Header */}
                <div className="header">
                    <h1>Welcome, Student!</h1>
                    <p>Keep track of your learning progress.</p>
                </div>

                {/* Statistics */}
                <div className="statistics">
                    <div className="stat-card">
                        <h3>Courses Enrolled</h3>
                        <p>5</p>
                    </div>
                    <div className="stat-card">
                        <h3>Assignments Submitted</h3>
                        <p>12</p>
                    </div>
                    <div className="stat-card">
                        <h3>Study Plan Progress</h3>
                        <p>80%</p>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="recent-activities">
                    <h2>Recent Activities</h2>
                    <ul>
                        <li>Completed "React Basics" Course</li>
                        <li>Submitted Assignment: JavaScript Arrays</li>
                        <li>Updated Study Plan for Week 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
