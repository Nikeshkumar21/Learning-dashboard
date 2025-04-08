import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../styles/Course.css';


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Handle Modal Open/Close
    const handleShowModal = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
        setShowModal(false);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Available IT Courses</h2>
            <div className="row">
                {courses.map((course) => (
                    <div key={course._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                {/* Tooltip on the Title */}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            Click "View Details" to learn more about this course.
                                        </Tooltip>
                                    }
                                >
                                    <h5 className="card-title" style={{ cursor: 'pointer' }}>
                                        {course.title}
                                    </h5>
                                </OverlayTrigger>
                                <p className="card-text text-muted">{course.description}</p>
                                {/* Button to Open Modal */}
                                <Button
                                    variant="primary"
                                    className="mt-auto"
                                    onClick={() => handleShowModal(course)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Course Details */}
            {selectedCourse && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCourse.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Description:</strong> {selectedCourse.description}</p>
                        <p>
                            <strong>Additional Information:</strong> This is a placeholder for extended
                            course details. You can include syllabus, prerequisites, or instructor
                            details here.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Courses;
