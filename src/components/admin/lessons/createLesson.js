import React, {useState, useEffect} from "react"

//states needed

//vocab list is an array of flashcards

//flashcards are term, translation, pinyin objects with pinyin being optional

//we want to also use this same UI to modify flashcards

//so we need two use cases: loading up an existing vocab set and then having no existing vocab set

//we need to be able to edit current fields and then also add 


const CreateLesson = () => {

    const createLesson = () => {
        if (lesson.some((card)=> card.term ===null|| card.translation === null)) {
            window.alert("Please fill out all fields")
            return
        }
        window.alert("Lesson created")

        console.log("Created a lesson")
    }

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

   

    const [lesson, setLesson] = useState(testLesson)

    const handleTermChange = (changeIndex, e) => {
        const newLesson = [...lesson];
        newLesson[changeIndex].term = e.target.value;
        setLesson(newLesson)
    }

    const handleTranslationChange = (changeIndex, e) => {
        const newLesson = [...lesson];
        newLesson[changeIndex].translation = e.target.translation;
        setLesson(newLesson)
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
    return (
        <div> 
            <h3> Create and Edit Lesson </h3>
            <div>
                {lesson.map((card, index)=>
                <div key = {index}>
                    <number> {index}</number>
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
            <button onClick = {createLesson} > Create a lesson </button>
        </div>
    )
}

export default CreateLesson