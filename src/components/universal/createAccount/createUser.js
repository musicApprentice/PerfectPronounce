import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolDropdown from './schoolDropdown';

const CreateUser = () => {
  //setting state variables needed for creating user 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('')


  const navigate = useNavigate();
  //navigate is a function that can be used to navigate between routes

  const handleSubmit = (e) => {
    e.preventDefault();
    let school = selectedSchool
    const newUser = { firstName, lastName, email, role, school };
    //on submit button we create a new user object


    //call fetch with a post method where we convert the user's data to data
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (response.ok) {
          window.alert(`User created ${newUser}`)
          console.log('User created:', newUser);
          // Navigate to the appropriate route based on the user's role
          if (role === 'Admin') {
            navigate('/admin');
          } else if (role === 'Student') {
            navigate('/student');
          } else if (role === 'Teacher') {
            navigate('/teacher');
          }
        } else {
          throw new Error('Failed to create user');
        }
      })
      .catch(error => console.error("Email may already exist in database. Please try another email.", error));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <h2> Create Account </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roles">Select a Role</label>
          <select id="roles" value={role} onChange={handleRoleChange} required>
            <option value="" disabled>Select a role</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor = "email"> Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
        <label htmlFor = "email"> Password: </label>

          <input
          
            type="password"
            id="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <SchoolDropdown selectedSchool={selectedSchool} setSelectedSchool={setSelectedSchool} required  />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
