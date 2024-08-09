import React from 'react';
import './navbar.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userId }) => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate(); // Hook should be at the top level

    const handleLogoutAndNavigate = () => {
        handleLogout();  // Call the logout function
        navigate('/');   // Navigate to the main page
    };

    return (
        <div className="navbar">
            <div className="dropdown">
                <div className="dropdown-icon">
                    {userId ? userId.charAt(0).toUpperCase() : "J"} {/* Handle case when userId is null */}
                </div>
                <div className="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a href="#" onClick={handleLogoutAndNavigate}>Logout</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
