import React, {useState, useEffect} from 'react'
// import './UserList.css'
const UserList = () => {
    //create states
    const [users, setUsers] = useState([]);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [school, setSchool] = useState([]);

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
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error))
    }
    
    const handleAddUser = (e) => {
        e.preventDefault();

        const newUser = {name, email, school};

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
            setUsers([...users, data]);
            setName('');
            setEmail('');
            setSchool('');

        })
        .catch(error => console.error("Error adding user", error))
    }

    const handleDeleteUser = (email) => {
        const encodedEmail = encodeURIComponent(email)
        fetch(`http://localhost:3000/api/users/email/${encodedEmail}`, {
            method: "DELETE",
        })
        .then(() => {
            setUsers(users.filter(user => user.email !== email));
        })
        .catch(error => console.error("Error deleting user:", error))
    }

    return (
        <div>
            <h1> User List</h1>
            <form onSubmit = {handleAddUser}>
                <input
                type = "text"
                placeholder = "Name"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
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
                type = "text"
                placeholder = "School"
                onChange = {(e) => setSchool(e.target.value)}
                required
                />
                <button type = "submit"> Add New User </button>
            </form>
            {users.map((user, index) => (
                <li key = {user._id || index}>
                    {/* curly braces {} allow you to include JavaScript code within the JSX */}
                    {user.name} - {user.email} - {user.age}
                    <button onClick = {() => handleDeleteUser(user.email)}>Delete</button>
                </li>
            ))}
        </div>
    ) 
};

export default UserList;
