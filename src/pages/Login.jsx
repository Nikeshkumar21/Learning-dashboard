import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
    const [isActive, setIsActive] = useState(false); // For toggling between Sign In and Sign Up
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Student', // Default to 'Student'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Add `login-body` class to body when this component is mounted
    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Login Submit
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email: formData.email,
                password: formData.password,
            });
            const { token, role, name } = response.data;

            // Save token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);

            // Redirect based on role
            if (role === 'Admin') navigate('/admin');
            else if (role === 'Educator') navigate('/educator');
            else if (role === 'Student') navigate('/student');
        } catch (err) {
            console.error('Login failed:', err.response?.data?.message || err.message);
            setError('Invalid email or password.');
        }
    };

    // Handle Sign Up Submit
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role, // Send selected role
            });
            setIsActive(false); // Switch to Sign In after successful registration
        } catch (err) {
            console.error('Sign Up failed:', err.response?.data?.message || err.message);
            setError('Failed to create account. Please try again.');
        }
    };

    return (
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* Sign Up Form */}
            <div className="form-container sign-up">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1> 
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Role</option>
                        <option value="Admin">Admin</option>              
                        <option value="Educator">Educator</option>
                        <option value="Student">Student</option>
                    </select>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit">Register</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="form-container sign-in">
                <form onSubmit={handleLogin}>
                    <h1>LOGIN</h1>
                    <span>or use your email and password</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <a href="#">Forgot Your Password?</a>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit"> Login </button>
                </form>
            </div>

            {/* Toggle Container */}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                        <button className="hidden" id="login" onClick={() => setIsActive(false)}>
                            Login
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello Friends!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" id="register" onClick={() => setIsActive(true)}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
