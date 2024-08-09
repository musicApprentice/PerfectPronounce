import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the CSS specific to the Sidebar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // You can use faTimes for a close icon or choose another icon

const Sidebar = ({ userId }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon= {faBars} />

            </button>
            {!isCollapsed && (
                <>
                    
                    <h5>Welcome student {userId}!</h5>
                    <h5>
                        <Link to="classes">Classes</Link>
                    </h5>
                    <h5>
                        <Link to="lessons">Lessons</Link>
                    </h5>
                    <h5>
                        <Link to="assignments">Assignments</Link>
                    </h5>
                    <h5>
                        <Link to="practice">Practice</Link>
                    </h5>
                </>
            )}
        </div>
    );
};

export default Sidebar;
