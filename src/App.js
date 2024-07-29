import React from "react";
import './App.css';
import logoSrc from './imgs/Language_Maestro.png'
import UserList from "./components/universal/userList/UserList";
import CreateUser from "./components/universal/createAccount/createUser";
import Login from "./components/universal/login/login";
import AdminLayout from "./components/admin/adminLayout";
import StudentLayout from "./components/student/studentLayout";
import TeacherLayout from "./components/teacher/teacherLayout";

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function AuthButton() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/createAccount');
  };

  return (
    <>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}

function App() {
  return (
    <Router>
      <div class="background-container"></div>
      <div class="overlay">
        <div class="header">
            <h1><img src = {logoSrc} className="logo" alt="logo"></img></h1>
            <div className="auth-buttons">
              <AuthButton />
            </div>
        </div>
        <div class="content">
            <h2>Experience a new era of foreign language learning</h2>
            <button class="get-started" onclick="getStarted()">Get Started</button>
        </div>

        <Routes>
          <Route path="/createAccount" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
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
