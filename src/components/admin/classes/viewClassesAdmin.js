import React, {useState, useEffect} from 'react';

const ViewClasses = () => {
    //define getters and setters
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    //To be added later on 

    useEffect(()=> {
        fetchClasses();
    })

    const fetchClasses = () => {
        fetch("http://localhost:3000/api/classes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setClasses(data))
        .catch(error => console.error(error,"Error fetching classes"))


    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredClasses = classes.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
        <h3> Class Database </h3>
            <label htmlFor = "classSearch"> Search for Classes:</label>
            <input
                id = "classSearch"
                type = "search"
                placeholder = "Search for classes..."
                value = {searchTerm}
                onChange = {handleSearchChange}
            />

            <h3></h3>

            <div>
                {filteredClasses.map((course, index) => (
                    <div key = {index}>
                        {course.name}-{course.language}
                    </div>
                ))}
            </div>
        </div>
    
    );
}

export default ViewClasses;