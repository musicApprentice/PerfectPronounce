import React, { useState, useEffect } from 'react';
// import './userSelect.css';



function AddStudents({selectedStudents = [], setSelectedStudents}) {
    
    //getters and setters
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [allStudents, setAllStudents] = useState([])

    const fetchUsers = () => {
        fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        //json() parses the response object and extracts the body and turns it into a js object
        .then(data=> data.filter((user) => user.role === 'Student'))
        .then(students => setAllStudents(students))
        .catch(error => console.error('Error fetching users:', error))
    }
    
    useEffect(() => {
        fetchUsers()
    },[])

    
    const filteredStudents = allStudents.filter((student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase())

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

    const handleStudentClick = (student) => {
        if (!selectedStudents.includes(student)) {
            //...spreads the elements of the array so we essentially add every indexed element of selectedStudents and then append student
            setSelectedStudents([...selectedStudents, student]);
        }
        setSearchTerm('');
        setDropdownVisible(false);
    };

    const handleDeleteUser = (student) => {
        setSelectedStudents(selectedStudents.filter(s=> s!==student))
    }

    return (
        <div className="App">
            <label> Add Students...</label>
            <div className="selected-students">
                <div>
                    {selectedStudents.map((student, index) => (
                        <div key={index}>
                        {student.firstName} {student.lastName} {student.email}
                        <button onClick={() => handleDeleteUser(student)}>Remove</button>

                        </div>

                    ))}
                </div>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Add students..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                    //when a user clicks on this input we call handleFocus which makes the dropDown visible
                    onBlur={handleBlur}
                    //when a user clicks off this input we call handleBlur which makes the dropDown invisible
                />
                {isDropdownVisible && (
                    <ul className="dropdown">
                        {filteredStudents.map((student, index) => (
                            <li key={index} onClick={() => handleStudentClick(student)}>
                                {student.firstName} {student.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AddStudents;
