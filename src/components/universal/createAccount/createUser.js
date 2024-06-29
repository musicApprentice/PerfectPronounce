// CreateUser.js
import React, { useState } from 'react';
import SchoolDropdown from './schoolDropdown';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('User created:', { firstName, lastName, role, email, selectedSchool });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
       <div>
        <label htmlFor="roles">Select a Role</label>
        <select id="roles" value={role} onChange={handleRoleChange}>
            <option value="" disabled>Select a role</option>
            <option value="Admin">Admin</option>
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
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <SchoolDropdown selectedSchool={selectedSchool} setSelectedSchool={setSelectedSchool} />
    
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
