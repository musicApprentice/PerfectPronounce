import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ userId }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation(); 

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };




    return (
        // Conditionally set the class name of the sidebar so that we can have two different stylings for two different states
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            {!isCollapsed && (
                <>
                    <h5>Welcome User {userId}!</h5>
                    {/* Conditionally set the class name so we can target the current tab in the css */}
                    <h5>
                        <Link to="users" className={location.pathname === '/admin/users' ? 'active' : ''}>Users</Link>
                    </h5>
                    <h5>
                        <Link to="classes" className={location.pathname === '/admin/classes' ? 'active' : ''}>Classes</Link>
                    </h5>
                    <h5>
                        <Link to="lessons" className={location.pathname === '/admin/lessons' ? 'active' : ''}>Lessons</Link>
                    </h5>
                    <h5>
                        <Link to="assignments" className={location.pathname === '/admin/assignments' ? 'active' : ''}>Assignments</Link>
                    </h5>
                    <h5>
                        <Link to="practice" className={location.pathname === '/admin/practice' ? 'active' : ''}>Practice</Link>
                    </h5>
                </>
            )}
        </div>
    );
};

export default Sidebar;
