import React, { useState, useEffect } from 'react';
import './Assignment.css'; // Import CSS for styling

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });

    // Fetch existing assignments (simulate fetching from an API)
    useEffect(() => {
        // Simulated data (replace with an actual API call)
        const fetchedAssignments = [
            { id: 1, title: 'React Basics', description: 'Learn React fundamentals', dueDate: '2023-12-31' },
            { id: 2, title: 'CSS Flexbox', description: 'Understand layout with Flexbox', dueDate: '2023-12-25' },
        ];
        setAssignments(fetchedAssignments);
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment({ ...newAssignment, [name]: value });
    };

    // Handle assignment submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAssignments = [...assignments, { ...newAssignment, id: Date.now() }];
        setAssignments(updatedAssignments);
        setNewAssignment({ title: '', description: '', dueDate: '' }); // Reset form
    };

    return (
        <div className="assignment-container">
            <h1 className="assignment-title">Assignments</h1>

            {/* Assignment List */}
            <div className="assignment-list">
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="assignment-card">
                            <h3>{assignment.title}</h3>
                            <p>{assignment.description}</p>
                            <span className="due-date">Due: {assignment.dueDate}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-assignments">No assignments available.</p>
                )}
            </div>

            {/* Create Assignment Form */}
            <div className="assignment-form">
                <h2>Create New Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newAssignment.title}
                            onChange={handleChange}
                            placeholder="Enter assignment title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newAssignment.description}
                            onChange={handleChange}
                            placeholder="Enter assignment description"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={newAssignment.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Add Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default Assignment;
