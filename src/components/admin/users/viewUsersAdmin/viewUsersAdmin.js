import React, {useState, useEffect} from 'react'
const ViewUsers = () => {
    //create getters and setters
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



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
        //json() parses the response object and extracts the body and turns it into a js object
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error))
    }
    
   
 
    const handleDeleteUser = (email) => {
        // Show a confirmation dialog
        const confirmed = window.confirm(`All records will be lost for ${email}! This cannot be undone!`);
        
        // If deletion of this user confirmed, proceed with the deletion
        if (confirmed) {
            // encodeURIComponent encodes the email properly by changing the @ in the address to %40
            const encodedEmail = encodeURIComponent(email);
            fetch(`http://localhost:3000/api/users/email/${encodedEmail}`, {
                method: "DELETE",
            })
            .then(() => {
                //once deleted we want to setUsers again to reflect the change in the database, this avoids a re-fetch request
                setUsers(users.filter(user => user.email !== email));
                window.alert(`${email}'s account has been deleted successfully`)
            })
            .catch(error => console.error("Error deleting user:", error));
        }
    };
    


    //we set our search term using this function
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    //filteredUsers array where we apply if any of our fields match the search term
    //use lower case to match more results
    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    //return statement in a react component defines what gets rendered to the DOM (document object model)
    return (
        <div>
            <h3> User List</h3>
            <label htmlFor="firstName">Search for Users:</label>
            
            <input
                type="search"
                placeholder="Search for users..."
                value={searchTerm}
                //the value of this will be searchTerm
                onChange={handleSearchChange}
                //when this value changes, we call the function that in turn calls setSearchTerm
            />
            <h3></h3>

             <div >
                {/* We map the filtered users as to show name, email and school and have a delete button for each user */}
                {filteredUsers.map((user, index) => (
                    <div key={index} >
                        {/* React mandates the use of a key to keep track of a list of DOM elements 
                        here each div which represents one user's info and has a unique key *which is scoped to only the local list**/}
                            {user.firstName} {user.lastName} - {user.email} - {user.school} - {user.role}
                            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ViewUsers;
