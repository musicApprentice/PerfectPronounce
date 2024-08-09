import React, {useEffect, useState } from "react";
const CreateAssignment = () => {
    const [attempts, SetAttempts] = useState();
    const [scoringType, setScoringType] = useState("");
    const [goalAverage, setGoalAverage] = useState();
    const [lessons, setLessons] = useState();
    const [lesson, setLesson] = useState();


    const SendNewAssignment = (e) => {
        e.preventDefault();
        console.log(lesson)
        const newAssignment = {attempts, scoringType, goalAverage, lesson};

        console.log(newAssignment)


        fetch("http://localhost:3000/api/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAssignment)
        })
        .then(response => response.json)
        .then(data => {
            window.alert("Created new assignment")
        })
        .catch(error => console.error(error))
    }


    const handleAttemptNumChange = (e) => {
        SetAttempts(e.target.value)
    }

    const handleGoalAverageChange = (e) => {
        setGoalAverage(e.target.value)
    }

    const handleScoreTypeChange = (e) => {
        setScoringType(e.target.value)
    }

    const lesson1 = 
    {"lessonNumber": 1,
     "name": "Animals",
     "vocabList": [
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
    ]}

    const lesson2 =
    {
    "lessonNumber": 2,
    "name": "Famous Places",
    "vocabList":[ 
        {"term": "長城", "translation": "Great Wall of China"},
        {"term": "金字塔", "translation": "Pyramids of Giza"},
        {"term": "自由女神像", "translation": "Statue of Liberty"},
        {"term": "埃菲爾鐵塔", "translation": "Eiffel Tower"},
        {"term": "泰姬陵", "translation": "Taj Mahal"},
        {"term": "大峽谷", "translation": "Grand Canyon"},
        {"term": "羅馬競技場", "translation": "Colosseum"},
        {"term": "馬丘比丘", "translation": "Machu Picchu"},
        {"term": "大堡礁", "translation": "Great Barrier Reef"},
        {"term": "尼亞加拉瀑布", "translation": "Niagara Falls"},
        {"term": "悉尼歌劇院", "translation": "Sydney Opera House"},
        {"term": "聖彼得大教堂", "translation": "St. Peter's Basilica"},
        {"term": "萬里長城", "translation": "Great Wall of China"},
        {"term": "聖母院", "translation": "Notre Dame Cathedral"},
        {"term": "克里姆林宮", "translation": "Kremlin"},
        {"term": "白宮", "translation": "White House"},
        {"term": "紅場", "translation": "Red Square"},
        {"term": "金門大橋", "translation": "Golden Gate Bridge"},
        {"term": "撒哈拉沙漠", "translation": "Sahara Desert"}
    ]}
    const fetchLessons = () => {
        fetch("http://localhost:3000/api/lessons", {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        
        }) 
        .then(response =>response.json())
        .then(data => setLessons(data))
        .catch(error => console.error(error, "error fetching lessons"))
    }

     useEffect(()=> fetchLessons(), [])


    const handleLessonChange = (selectedLesson) => {
        console.log("lesson got changed", selectedLesson)
        setLesson(selectedLesson)
        console.log(lesson)
    }
    const goToLesson= (selectedLesson) => {
        window.alert(`Going to lesson ${selectedLesson.name}`)
    }
    return (
        <div> 
            <h3>Create New Assignment</h3>
            
            <div value = {lesson}>
                <h4 value = {lesson} disabled>Select a lesson</h4>
                {lessons && lessons.map((lesson, index) =>
                    <li key = {index} >
                        <span onClick = {()=>handleLessonChange(lesson)}>
                             Lesson  {lesson.name} 
                        </span>
                        <button onClick={() => goToLesson(lesson)}> Go to Lesson</button>
                    </li>

                )}
            </div>
            {lesson && (
            <div>
                <h5>Selected Lesson</h5>
                <p>Lesson {lesson.lessonNumber}: {lesson.name} Preview</p>
                <ul>
                    {lesson.flashcards.filter((item, index)=> index < 5).map((item, index) => (
                        <li key={index}>  {item.term} - {item.translation}</li>
                    ))}
                </ul>
            </div>
        )}
            <form onSubmit = {SendNewAssignment}>
                <div>
                <label htmlFor="attempts">Required # of Attempts</label>
                <input
                    required
                    id= "attempts"
                    type = "number"
                    min = "1"
                    placeholder="Required # of attempts"
                    value= {attempts}
                    onChange={(e)=> handleAttemptNumChange(e)}
                />
                </div>
                <div>
                    <label htmlFor = "Average"> Goal Average </label>
                    <input 
                        id = "average"
                        type = "number"
                        placeholder="Average"
                        step = "3"
                        min = "1"
                        max = "100"
                        value= {goalAverage}
                        onChange={(e)=> handleGoalAverageChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="scoringType"> Scoring Type </label>
                    <select id = "scoringType" value = {scoringType} onChange ={(e)=> handleScoreTypeChange(e)}>
                        <option value = "" disabled> Select Scoring Type</option>
                        <option value = "practiceMode"> Practice mode with no goal average or score</option>
                        {attempts && attempts !== 0 &&
                                <>
                                <option value = "numAttempts"> Minimum of {attempts} attempts </option>
                                </>
                        }
                        {attempts && attempts !== 0 && goalAverage && goalAverage!==0 && (
                            <>
                                <option value = "highestAverage"> Highest Average over any {attempts?attempts:0} attempts</option>
                                <option value = "last10Average">Average of last {attempts} attempts</option>
                            </>
                        )}
                        

                    </select>
                </div>
        
                <button type = "submit"> Create New Assignment</button>
                </form>
            
        </div>
    )
}
export default CreateAssignment;