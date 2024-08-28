import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from  "../../../AuthContext"

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const {handleLogin} = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    
    fetch(`http://localhost:3000/api/users/${email}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => {
      handleLogin(user)
      navigateBasedOnRole()
    })
    .catch(error => console.error("error", error))


    console.log('User logged in:', { email, password, role });
    window.alert(`${email} logged in`)

    const navigateBasedOnRole = () => {
      console.log("Navigate function called")
      if (role === 'Admin') {
        navigate('/admin');
      } else if (role === 'Student') {
        navigate(`/student`);
      } else if (role === 'Teacher') {
        navigate('/teacher');
      }
   }

    //TODO: Get the id for the user and put it here
    // handleLogin()
    // onLogin()
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2> Login </h2>

       <div>
        <label htmlFor="roles">Select a Role</label>
        <select id="roles" value={role} onChange={handleRoleChange} required>
            <option value="" disabled>Select a role</option>
            <option value="Admin">Admin</option>
            {/* <option value="Student">Student</option>
            <option value="Teacher">Teacher</option> */}
        </select>
     </div>
     
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Password:</label>
          <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    
      <button type="submit">Login to Account</button>
    </form>
  );
};

export default Login;
