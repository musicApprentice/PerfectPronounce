import React from "react";
import './App.css';
import UserList from "./UserList"
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const About =() => <h2> About </h2>



function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;