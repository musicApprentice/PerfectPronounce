import React from 'react'
import {Outlet, Link} from 'react-router-dom'

//We want to be able to view all user information here
const AdminLayout = () => {
    return (
      <div> Admin Page
        <nav/>
             <h5>
              <Link to="/admin">Admin Home</Link>
            </h5>
            <h5>
              <Link to="users">Users</Link>
            </h5>
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
              <Link to="practice"> Practice </Link>
            </h5>
        <Outlet /> {/* This is where the nested route components will be rendered */}
      </div>
    );
  };

export default AdminLayout