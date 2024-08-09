import React, {useState, useEffect} from 'react';

const ViewAssignments = () => {
    //define getters and setters
    const [lessons, setLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    //To be added later on 

    useEffect(()=> {
        fetchLessons();
    })

    const fetchLessons = () => {
        fetch("http://localhost:3000/api/lessons", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setLessons(data))
        .catch(error => console.error(error,"Error fetching lessons"))


    }

    const deleteLesson = (deleteLesson) => {
        if (window.confirm("You are about to delete this lesson")) {
            fetch(`http://localhost:3000/api/lessons/id/${deleteLesson._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(response => response.json())
            .then(setLessons(lessons.filter((lesson)=> lesson._id !== deleteLesson._id)))
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredLessons = lessons
    .filter(lesson => 
        lesson.name && lesson.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    return (
        <div>
        <h3> Lesson Database </h3>
            <label htmlFor = "lessonSearch"> Search for Lessons:</label>
            <input
                id = "lessonSearch"
                type = "search"
                placeholder = "Search for lessons..."
                value = {searchTerm}
                onChange = {handleSearchChange}
            />

            <h3></h3>

            <div>
                {filteredLessons.map((lesson, index) => (
                    <div key = {index}>
                        {lesson.name}--
                        <button onClick = {() => deleteLesson(lesson)}> Delete </button>

                    </div>
                ))}
            </div>
        </div>
    
    );
}

export default ViewAssignments;