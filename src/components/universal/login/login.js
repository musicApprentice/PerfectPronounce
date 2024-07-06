import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    
    console.log('User logged in:', { email, role });

    // Navigate to the appropriate route based on the user's role
    if (role === 'Admin') {
      navigate('/admin');
    } else if (role === 'Student') {
      navigate('/student');
    } else if (role === 'Teacher') {
      navigate('/teacher');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1> Login </h1>

       <div>
        <label htmlFor="roles">Select a Role</label>
        <select id="roles" value={role} onChange={handleRoleChange} required>
            <option value="" disabled>Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
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
    
      <button type="submit">Login to Account</button>
    </form>
  );
};

export default Login;
