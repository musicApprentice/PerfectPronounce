import React, { useState, useEffect } from 'react';

//based off addStudents.js
function AddTeachers({selectedTeachers = [], setSelectedTeachers}) {
    
    //getters and setters
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [allTeachers, setAllTeachers] = useState([])

    const fetchUsers = () => {
        fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        //json() parses the response object and extracts the body and turns it into a js object
        .then(data=> data.filter((user) => user.role === 'Teacher'))
        .then(students => setAllTeachers(students))
        .catch(error => console.error('Error fetching users:', error))
    }

    useEffect(()=> {fetchUsers()}, [])


    const filteredTeachers = allTeachers.filter(teacher =>
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setDropdownVisible(true);
    };

    const handleFocus = () => {
        setDropdownVisible(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };

    const handleTeacherClick = (teacher) => {
        
        setSelectedTeachers([...selectedTeachers, teacher]);
        console.log(selectedTeachers)
        setSearchTerm('');
        setDropdownVisible(false);
    };

    const handleDeleteUser = (teacher) => {
        setSelectedTeachers(selectedTeachers.filter(s=> s!==teacher))
    }

    return (
        <div>
            <label> Add Teachers...</label>
            <div className="selected-teachers">
                <div>
                    {selectedTeachers.map((teacher, index) => (
                        <div key={index}>
                        {teacher.firstName} {teacher.lastName} {teacher.email}
                        <button onClick={() => handleDeleteUser(teacher)}>Remove</button>

                        </div>

                    ))}
                </div>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Add teachers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isDropdownVisible && (
                    <ul className="dropdown">
                        {filteredTeachers.map((teacher, index) => (
                            <li key={index} onClick={() => handleTeacherClick(teacher)}>
                                {teacher.firstName} {teacher.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AddTeachers;
