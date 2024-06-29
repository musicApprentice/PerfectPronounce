import React from "react";
import './App.css';
import UserList from "./components/universal/userList/UserList"
import CreateUser from "./components/universal/createAccount/createUser"

import AdminLayout from "./components/admin/adminLayout"
import StudentLayout from "./components/student/studentLayout"
import TeacherLayout from "./components/teacher/teacherLayout"



import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const About =() => <h2> About </h2>



function App() {
  return (
    <Router>
      <div className="App">
        Welcome to LanguageMaestro
        <nav>
          <ul>
            <li>
              <Link to="/createAccount">Create Account</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/student">Student</Link>
            </li>
            <li>
             <Link to="/teacher">Teacher</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/createAccount" element={<CreateUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/student" element={<StudentLayout />} />
          <Route path="/teacher" element={<TeacherLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;