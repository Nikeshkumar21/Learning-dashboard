import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router> {/* Only one Router wrapping the app */}
            
                <App />
        
        </Router>
    </React.StrictMode>
);

