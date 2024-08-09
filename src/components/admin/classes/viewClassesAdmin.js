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
        course.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (deleteCourse) => {
        const confirmDelete = window.confirm(`You are about to permanently delete ${deleteCourse.className}`)
        console.log(deleteCourse)
        if (confirmDelete) {
            fetch(`http://localhost:3000/api/classes/id/${deleteCourse._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(setClasses(classes.filter((course) => course!== deleteCourse)))
            .catch(error => console.error(error,"Error deleting class"))
        }
    }
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
                {classes.map((course, index) => (
                    <li key = {index}>
                        {course.className}- {course.language} - {course.courseNumber}

                        <h4> 
                            
                            {course.students && course.students.map((student, index) =>(
                                <h6 key = {index}>
                                {student.firstName} {student.lastName} {student.email}
                                </h6>
                            )
                            )}
                        </h4>
                        <h4>                             
                            {course.teachers && course.teachers.map((teacher, index) =>(
                                <h6 key = {index}>
                                {teacher.firstName} {teacher.lastName} {teacher.email}
                                </h6>
            
                            )
                            )}
                        </h4>
                        <button onClick={()=>handleDelete(course)}> Delete </button>
                    </li>
                ))}
            </div>
        </div>
    
    );
}

export default ViewClasses;