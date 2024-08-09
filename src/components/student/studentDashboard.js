import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from "../../AuthContext";
import Sidebar from './sidebar'; // Import the Sidebar component
import Navbar from './navbar'; // Import the Navbar component
import './studentDashboard.css'; // Import the CSS specific to the layout

const UserDashboard = () => {
    const { userId, logout } = useAuth();
    console.log(userId);

    return (
        <div className="dashboard-container">
            <Sidebar userId={userId} />
            <div className="sidebar-container">
                <Navbar userId={userId} logout={logout} />
                <div className="content">
                    <Outlet /> {/* This is where the nested route components will be rendered */}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
