import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import EducatorDashboard from './pages/EducatorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Assignment from './pages/Assignments';
import Studyplan from './pages/StudyPlans'; 
import ManageUsers from './pages/admin page/ManageUsers';


const App = () => {
    return (
        <>

         <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />

                {/* Courses Page */}
                <Route
                path="/courses"
                element={
                    <ProtectedRoute allowedRoles={['Admin', 'Educator', 'Student']}>
                        <Courses />
                    </ProtectedRoute>
                }
            />
               <Route
                path="/Assignments"
                element={
                    <ProtectedRoute allowedRoles={['Admin', 'Educator', 'Student']}>
                        <Assignment />
                    </ProtectedRoute>
                }
            />
              <Route
                path="/StudyPlans"
                element={
                    <ProtectedRoute allowedRoles={['Admin', 'Educator', 'Student']}>
                        <Studyplan />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin page/ManageUser"
                element={
                    <ProtectedRoute allowedRoles={['Admin', 'Educator',]}>
                        <ManageUsers />
                    </ProtectedRoute>
                }
            />
            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Educator Routes */}
            <Route
                path="/educator"
                element={
                    <ProtectedRoute allowedRoles={['Educator']}>
                        <EducatorDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Student Routes */}
            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />
            
        </Routes>
        </>
    );
};

export default App;
