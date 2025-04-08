import React, { useEffect, useState } from 'react';
import './StudyPlan.css';

const StudyPlan = () => {
    const [studyPlans, setStudyPlans] = useState([]);
    const [newPlan, setNewPlan] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        // Simulate fetching study plans and role from API/localStorage
        const fetchStudyPlans = async () => {
            const mockData = [
                { id: 1, title: 'React Basics', progress: 60 },
                { id: 2, title: 'Node.js Fundamentals', progress: 30 },
                { id: 3, title: 'MongoDB Queries', progress: 80 },
            ];
            setStudyPlans(mockData);

            const storedRole = localStorage.getItem('role') || 'Student';
            setRole(storedRole);
        };

        fetchStudyPlans();
    }, []);

    const handleAddPlan = () => {
        if (!newPlan.trim()) {
            setError('Plan title cannot be empty.');
            return;
        }

        setStudyPlans([
            ...studyPlans,
            { id: Date.now(), title: newPlan, progress: 0 },
        ]);
        setNewPlan('');
        setError('');
    };

    const handleDelete = (id) => {
        setStudyPlans(studyPlans.filter((plan) => plan.id !== id));
    };

    const handleEdit = (id) => {
        const editedTitle = prompt('Enter new title:');
        if (editedTitle) {
            setStudyPlans(
                studyPlans.map((plan) =>
                    plan.id === id ? { ...plan, title: editedTitle } : plan
                )
            );
        }
    };

    return (
        <div className="studyplan-container">
            <h1 className="title">My Study Plans</h1>

            {/* Add Plan Section: Only Admin/Educator */}
            {(role === 'Admin' || role === 'Educator') && (
                <div className="add-plan">
                    <input
                        type="text"
                        placeholder="Enter study plan title..."
                        value={newPlan}
                        onChange={(e) => setNewPlan(e.target.value)}
                    />
                    <button onClick={handleAddPlan}>Add Plan</button>
                </div>
            )}
            {error && <div className="error">{error}</div>}

            {/* Plans List */}
            <div className="plans-list">
                {studyPlans.length > 0 ? (
                    studyPlans.map((plan) => (
                        <div key={plan.id} className="plan-card">
                            <h2>{plan.title}</h2>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${plan.progress}%` }}
                                ></div>
                            </div>
                            <p>{plan.progress}% Completed</p>

                            {/* Admin/Educator Controls */}
                            {(role === 'Admin' || role === 'Educator') && (
                                <div className="controls">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(plan.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(plan.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                            {/* Student Controls */}
                            {role === 'Student' && (
                                <button className="submit-btn">
                                    Submit Progress
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-plans">No study plans added yet.</p>
                )}
            </div>
        </div>
    );
};

export default StudyPlan;
