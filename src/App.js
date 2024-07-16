import React from "react";
import './App.css';
import CreateUser from "./components/universal/createAccount/createUser";
import Login from "./components/universal/login/login";
import AdminLayout from "./components/admin/adminLayout";
import StudentLayout from "./components/student/studentLayout";
import TeacherLayout from "./components/teacher/teacherLayout";
import AdminUserPage from "./components/admin/users/adminUserPage";
import AdminClassPage from "./components/admin/classes/adminClassPage";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminAssignmentPage from "./components/admin/lessons/adminAssignmentPage";

function App() {
  return (
    <Router>
      <div className="App">

        <nav>
        <h1> Language Maestro</h1>

          <ul>
            <h2>
              <Link to="/createAccount">Create Account</Link>
            </h2>
            <h2>
              <Link to="/login">Login to Account</Link>
            </h2>
         
          </ul>
        </nav>

        <Routes>
                <Route path="/createAccount" element={<CreateUser />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUserPage />} />
                    <Route path="classes" element={<AdminClassPage />}/>
                    <Route path="lessons" element={<AdminAssignmentPage />} />
                </Route>
                <Route path="/student" element={<StudentLayout />}>
                 
                </Route>
                <Route path="/teacher" element={<TeacherLayout />}>
             
                </Route>
            </Routes>
      </div>
    </Router>
  );
}

export default App;
