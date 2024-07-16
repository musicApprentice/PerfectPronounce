import React from 'react'
import {Outlet, Link} from 'react-router-dom'

const StudentLayout = () => {
    return (
      <div> Student Page
        <nav/>
             <h5>
              <Link to="/student">Student Home</Link>
            </h5>
            <h5>
              <Link to="classMates">Classmates</Link>
            </h5>
            <h5>
              <Link to="classes">Classes</Link>
            </h5>
            <h5>
              <Link to="lessons">Lessons</Link>
            </h5>
         
        <Outlet /> {/* This is where the nested route components will be rendered */}
      </div>
    );
  };

export default StudentLayout