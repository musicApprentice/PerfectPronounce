import { useState } from "react";

const PracticeAssignment = () => {
    const [attempts, setAttempts] = useState([]);
    const [curAssignment, setCurAssignment] = useState("");
    const [curCard, setCurCard] = useState("");

    const [newScore, setNewScore] = useState("");
    const [newTranscription, setNewTranscription] = useState("");

    const testAssignment = {
        minAttempts: 1,
        goalAverage: 10,
        dueDate: "None",
        scoringType: "highestAverage",
        lessonName: "Chapter 1: Animals",
        assignmentName: "Practice 1A"
    };

    const testFlashcardProgress = {
        timesPracticed: 0,
        average: 0,
        student: "Test Student",
        atomicScores: [],
        cardReference: { term: "cat", translation: "meows" }
    };

    const createNewAttempt = (e) => {
        e.preventDefault();
        setAttempts([...attempts, { score: newScore, transcription: newTranscription }]);
        setNewScore("");
        setNewTranscription("");
        window.alert("You made a new attempt, we have updated this assignment's atomic scores field");
    };

    return (
        <div>
            <h2>Grade Simulator</h2>
            <h5>Please select an assignment and a card</h5>
            <select value={curAssignment} onChange={(e) => setCurAssignment(testAssignment)}>
                <option disabled value="">
                    Select an assignment
                </option>
                <option value="Practice 1A">Practice 1A</option>
            </select>
            <select value={curCard} onChange={(e) => setCurCard(testFlashcardProgress)}>
                <option disabled value="">
                    Select a card
                </option>
                <option value="Card 1">Card 1</option>
            </select>
            {curAssignment && (
                <div>
                    <h6>Assignment Information</h6>
                    <ul>Lesson Name - {curAssignment.lessonName}</ul>
                    <ul>Assignment Name - {curAssignment.assignmentName}</ul>
                    <ul>Due Date - {curAssignment.dueDate}</ul>
                    <ul>Scoring Type - {curAssignment.scoringType}</ul>
                    <ul>Goal Average - {curAssignment.goalAverage} percent</ul>
                </div>
            )}

            {curCard && (
                <div>
                    <h6>Flashcard Info</h6>
                    <ul>Term - {curCard.cardReference.term}</ul>
                    <ul>Translation - {curCard.cardReference.translation}</ul>
                    <ul>Audio - Not available</ul>
                </div>
            )}
            {curCard && (
                <div>
                    <h6>Student Progress</h6>
                    <ul>Average - {curCard.average}</ul>
                    <ul>Attempts - {curCard.timesPracticed}</ul>
                </div>
            )}
            {curCard && (
                <form onSubmit={createNewAttempt}>
                    <h6>Enter a new attempt</h6>
                    <input
                        type="number"
                        placeholder="Enter a new score"
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter a new transcription"
                        value={newTranscription}
                        onChange={(e) => setNewTranscription(e.target.value)}
                    />
                    <button type="submit">Create New Attempt</button>
                </form>
            )}
            {curCard && attempts.length > 0 && (
                <div>
                    <h6>Attempts</h6>
                    {attempts.map((attempt, index) => (
                        <div key={index}>
                            <ul> Attempt {index}</ul>
                            <ul>Transcription: {attempt.transcription}</ul>
                            <ul>Score: {attempt.score}</ul>
                        </div>
                    ))}
                </div>
            )}
            <h1>The bottom</h1>
        </div>
    );
};

export default PracticeAssignment;
