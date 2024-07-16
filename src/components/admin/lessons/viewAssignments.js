import React, {useState, useEffect} from 'react';

const ViewAssignments = () => {
    //define getters and setters
    const [assignments, setAssignments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    //To be added later on 

    useEffect(()=> {
        fetchClasses();
    })

    const fetchClasses = () => {
        fetch("http://localhost:3000/api/assignments", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setAssignments(data))
        .catch(error => console.error(error,"Error fetching classes"))


    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredAssignment = assignments.filter(assignment => 
        assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
        <h3> Lesson Database </h3>
            <label htmlFor = "assignmentSearch"> Search for Lessons:</label>
            <input
                id = "assignmentSearch"
                type = "search"
                placeholder = "Search for assignments..."
                value = {searchTerm}
                onChange = {handleSearchChange}
            />

            <h3></h3>

            <div>
                {filteredAssignment.map((assignment, index) => (
                    <div key = {index}>
                        {assignment.name}-{assignment.language}
                    </div>
                ))}
            </div>
        </div>
    
    );
}

export default ViewAssignments;