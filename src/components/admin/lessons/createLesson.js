import React, {useState, useEffect} from "react"

//states needed

//vocab list is an array of flashcards

//flashcards are term, translation, pinyin objects with pinyin being optional

//we want to also use this same UI to modify flashcards

//so we need two use cases: loading up an existing vocab set and then having no existing vocab set

//we need to be able to edit current fields and then also add 


const CreateLesson = () => {
    const [lesson, setLesson] = useState([{term: "", translation: ""}])
    const [lessonName, setLessonName] = useState('')
    const [course, setCourse] = useState('')
    const [classes, setClasses] = useState([])

    const fetchClasses = () => {
        fetch("http://localhost:3000/api/classes", {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setClasses(data))
        .catch(error => console.error(error, "Error fetching classes"))
        
    }

    useEffect(()=>fetchClasses, []) 


    
    const createLesson = (e) => {
        e.preventDefault();
        if (lesson.some((card)=> card.term ===null|| card.translation === null)) {
            window.alert("Please fill out all fields")
            return
        }


        const flashcards = lesson;
        window.alert(`${course}`)
        console.log("Created a lesson", course, lessonName, flashcards)

        const newLesson = {course, lessonName, flashcards}
        fetch("http://localhost:3000/api/lessons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newLesson)
        })
        .then(response => response.json)
        .then(data => {
            window.alert("Lesson created")
            setLesson([{term: "", translation: ""}])
            setLessonName("")
            setCourse("")
        })
        .catch(error => console.error(error))
    }


    const handleTermChange = (changeIndex, e) => {
        const newLesson = [...lesson];
        newLesson[changeIndex].term = e.target.value;
        setLesson(newLesson)
    }

    const handleTranslationChange = (changeIndex, e) => {
        const newLesson = [...lesson];
        newLesson[changeIndex].translation = e.target.value;
        setLesson(newLesson)
        console.log(newLesson)
    }

    const addCard = () => {
        const newLesson = [...lesson];
        newLesson.push({term: null, translation: null})
        console.log("adding a new card")
        setLesson(newLesson)
    }

    const deleteCard = (index) => {
        const newLesson = [...lesson];
        if (window.confirm("Are you sure you want to delete this card?")) {
        newLesson.splice(index,1)
        setLesson(newLesson)
        }
    }

    const handleLessonNameChange = (e) => {
        setLessonName(e.target.value);
    }
    return (
        <div> 
            <h3> Create and Edit Lesson </h3>
            <form onSubmit={createLesson}>
                Lesson Name
                <input 
                    type = "text"
                    placeholder = "Enter Lesson Name"
                    value = {lessonName}
                    onChange = {(e) => setLessonName(e.target.value)}
                />
                Class Name
                <select value = {course} onChange = {(e) => setCourse(e.target.value)}>
                    <option value ="" disabled> Select a class</option>
                    {classes && classes.map((course, index) => (
                        <option value = {course._id} > {course.courseNumber}: {course.className} </option>
                    ))}
                    
                 </select>
                
                <div> Flashcards
                    {lesson.map((card, index)=>
                    <div key = {index}>
                        <number> {index+1}</number>
                        <input
                            placeholder="term"
                            type = "text"
                            onChange = {(event) => handleTermChange(index, event)}
                            value = {card.term}
                        />
                    
                        <input
                            placeholder="translation"
                            type = "text"
                            onChange = {(event) => handleTranslationChange(index, event)}
                            value = {card.translation}
                        
                        />
                        <button type = "button" onClick = {()=> deleteCard(index)}> Delete </button>
                    </div>
                    )}
                    <button type= "button" onClick = {addCard}>Add a card </button>
                </div>
                <button> Create a lesson </button>
            </form>
        </div>
    )
}

export default CreateLesson