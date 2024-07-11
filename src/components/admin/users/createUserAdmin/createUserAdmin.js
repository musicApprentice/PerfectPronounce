import React, {useState, useEffect} from 'react'
// import './UserList.css'
import SchoolDropdown from '../../../universal/createAccount/schoolDropdown';
const UserList = () => {
    //create states (getters and setters)
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [school, setSchool] = useState([]);
    const [password, setPassword] = useState([]);
    const [role, setRole] = useState([])


    useEffect(() => {
        fetchUsers();
    })
    const fetchUsers = () => {
        fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        //response.json() parses the json response object and then extracts the body portion and turns it into a js object
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error))
    }
    
    const handleAddUser = (e) => {
        e.preventDefault();

        const newUser = {firstName, lastName, password, email, school, role};

        fetch("http://localhost:3000/api/users", {
            method: "POST",
            //Post, get, delete
            //Post puts something in database
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newUser)
            //data sent to backend
        })
        .then(response => response.json)
        .then(data => {
            window.alert(`An account has been created successfully for ${email}`)
            //reload the page so that the userlist gets updated, should have a smoother way to do this in the future
            window.location.reload()
            setUsers([...users, data]);
            setFirstName('');
            setLastName('');
            setPassword('');
            setEmail('');
            setSchool('');
            setRole('');


        })
        .catch(error => console.error("Error adding user", error))
    }

    
    const handleRoleChange = (event) => {
        setRole(event.target.value);
      };
    
    return (
        <div>
            <h3> Create New User</h3>
            {/* The main part of the component is the submission form which creates a new user (note: able to create admins) */}
            {/* When we submit (click the submit button) we call the handleAddUser for the logic */}
            <form onSubmit = {handleAddUser}> Create User
             <label htmlFor=""></label> 
             {/* the label enlarges the clickable area of the dropdown for touchscreen, 
             it is not strictly needed, the htmlFor connects with the select id and binds them together */}
                <select id="roles" value={role} onChange={handleRoleChange} required>
                    <option value="" disabled>Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
                <input
                type = "text"
                //formats the input to the right type (button, text, password, email)
                placeholder = "First Name"
                //placeholder is what is displayed before you type
                value = {firstName}
                // event handler that listens for a change in this input field for first name
                // e is the event object, e.target is the element that triggered the event which is the input field
                // e.target.value extracts the input value
                onChange = {(e) => setFirstName(e.target.value)}
                required
                />
                 <input
                type = "text"
                placeholder = "Last Name"
                value = {lastName}
                onChange = {(e) => setLastName(e.target.value)}
                required
                />
                <input
                type = "email"
                placeholder= "Email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required
                />
                  <input
                type = "password"
                placeholder= "Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                required
                />
                <SchoolDropdown selectedSchool={school} setSelectedSchool={setSchool} required  />
                <button type = "submit"> Add New User </button>

            </form>
            
        </div>
    ) 
};

export default UserList;
