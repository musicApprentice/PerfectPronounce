import {React, useState} from "react";
import './App.css';
import CreateUser from "./components/universal/createAccount/createUser";
import Login from "./components/universal/login/login";
import AdminLayout from "./components/admin/adminLayout";
import StudentLayout from "./components/student/studentLayout";
import TeacherLayout from "./components/teacher/teacherLayout";
import AdminUserPage from "./components/admin/users/adminUserPage";
import AdminClassPage from "./components/admin/classes/adminClassPage";
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import AdminLessonPage from "./components/admin/lessons/lessonsPage";
import AdminAssignmentPage from "./components/admin/assignments/assignmentPage";
import PracticeAssignment from "./components/admin/practice/practice";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute"
import UserDashboard from "./components/student/studentDashboard";
import LandingPage from "./components/universal/landingPage";
function App() {
  /*We need to make a navbar component for the login 
    We also need a sidebar component for logged-in case
    The main screen is probably Assignments Due 
    Each component should follow the model of studentDashboard

    token for session is the next step
  */


  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <h3> Perfect Pronounce</h3>

      
        <LandingPage></LandingPage>
          

          <Routes>

                  <Route path="/createAccount" element={<CreateUser />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>}>
                      <Route path="users" element={<AdminUserPage />} />
                      {/* <Route path="users/:id" element={<UserDetails />} /> */}
                      <Route path="classes" element={<AdminClassPage />}/>
                      <Route path="lessons" element={<AdminLessonPage />} />
                      <Route path="assignments" element={<AdminAssignmentPage />} />
                      <Route path="practice" element={<PracticeAssignment/>} />

                  </Route>

                  <Route path="/student" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>}></Route>
                  <Route path="/teacher" element={<TeacherLayout />}>
              
                  </Route>
              </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
