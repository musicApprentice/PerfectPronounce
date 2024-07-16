import React from 'react'
import {Outlet, Link} from 'react-router-dom'

const TeacherLayout = () => {
    return (
      <div> Teacher Page
        <nav/>
             <h5>
              <Link to="/teacher">Teacher Home</Link>
            </h5>
            <h5>
              <Link to="users">Students</Link>
            </h5>
            <h5>
              <Link to="classes">Classes</Link>
            </h5>
            <h5>
              <Link to="lessons">Lessons</Link>
            </h5>
            <h5>
              <Link to="assignments">Assignment</Link>
            </h5>
        <Outlet /> {/* This is where the nested route components will be rendered */}
      </div>
    );
  };

export default TeacherLayout