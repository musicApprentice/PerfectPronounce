import React, {useState, useEffect} from "react"

//states needed

//vocab list is an array of flashcards

//flashcards are term, translation, pinyin objects with pinyin being optional

//we want to also use this same UI to modify flashcards

//so we need two use cases: loading up an existing vocab set and then having no existing vocab set

//we need to be able to edit current fields and then also add 


const CreateLesson = () => {


    //replace with a fetch
    const testLesson = 
    [
        {"term": "狗", "translation": "dog"},
        {"term": "貓", "translation": "cat"},
        {"term": "鳥", "translation": "bird"},
        {"term": "魚", "translation": "fish"},
        {"term": "馬", "translation": "horse"},
        {"term": "牛", "translation": "cow"},
        {"term": "羊", "translation": "sheep"},
        {"term": "豬", "translation": "pig"},
        {"term": "兔", "translation": "rabbit"},
        {"term": "熊", "translation": "bear"},
        {"term": "老虎", "translation": "tiger"},
        {"term": "獅子", "translation": "lion"},
        {"term": "猴子", "translation": "monkey"},
        {"term": "大象", "translation": "elephant"},
        {"term": "蛇", "translation": "snake"},
        {"term": "青蛙", "translation": "frog"},
        {"term": "鱷魚", "translation": "crocodile"},
        {"term": "烏龜", "translation": "turtle"},
        {"term": "老鼠", "translation": "mouse"},
        {"term": "蝴蝶", "translation": "butterfly"}
    ]

   

    const [lesson, setLesson] = useState([{term: "", translation: ""}])
    const [lessonName, setLessonName] = useState('')
    const hardCodedID = "66a0fee8e13160a3a275da33"
    const [course, setCourse] = useState(hardCodedID)

    
    const createLesson = (e) => {
        e.preventDefault();
        if (lesson.some((card)=> card.term ===null|| card.translation === null)) {
            // window.alert("Please fill out all fields")
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
            // window.alert("Lesson created")
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
                <select>
                    <option value ="" disabled> Select a class</option>
                    <option 
                        type = "text"
                        value = {course}
                        // hard code this id here 
                        onChange = {(e) => setCourse(e.target.value)}
                    >English 100: Test Class</option> 
                    
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
                        <button onClick = {()=> deleteCard(index)}> Delete </button>
                    </div>
                    )}
                    <button onClick = {addCard}>Add a card </button>
                </div>
                <button> Create a lesson </button>
            </form>
        </div>
    )
}

export default CreateLesson