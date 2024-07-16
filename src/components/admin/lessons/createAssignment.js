import { useState } from "react";
//This is under-commented and is lifted from Spring 2024 Language Master
//TODO:Comments
function CreateAssignment() {
    const [assignFields, setAssignFields] = useState([
        { wordName: "", englishTranslation: "" }, 
    ]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(""); 

    const handleFormChange = (event, index) => {
        let data = [...assignFields];
        data[index][event.target.name] = event.target.value;
        setAssignFields(data);
        if (error) setError(""); 
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        if (error) setError("");
    };

    const submit = (e) => {
        e.preventDefault(); 
        
    
        if (!title.trim()) {
            setError("Please enter an assignment title.");
            return;
        }
    
        const allFieldsComplete = assignFields.every(field => 
            field.wordName.trim() && field.englishTranslation.trim()
        );
        
        if (!allFieldsComplete) {
            setError("Please fill out all word and translation fields.");
            return;
        }
    
      
    };
    

    const addFields = () => {
        setAssignFields([...assignFields, { wordName: "", englishTranslation: "" }]);
    };

    const removeFields = (index) => {
        const confirmRemove = window.confirm("Are you sure you want to remove this card?");
        if (confirmRemove) {
            let data = [...assignFields];
            data.splice(index, 1);
            setAssignFields(data);
        }
    };

    return (
        <div className="CreateAsgmts container d-flex justify-content-center">
            <h1 id="assignmentTitle">Create Lesson</h1>
            <form onSubmit={submit} className="w-100"> 
                <div className="form-group">
                    <label htmlFor="title">Lesson Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter assignment title"
                    />
                </div>
                {assignFields.map((form, index) => (
                    <div key={index} className="card-entry">
                        <span className="card-number">{index + 1}.</span>
                        <div className="input-group">
                            <textarea
                                className="form-control"
                                name="wordName"
                                placeholder="Word"
                                value={form.wordName}
                                onChange={(event) => handleFormChange(event, index)}
                            ></textarea>
                            <textarea
                                className="form-control"
                                name="englishTranslation"
                                placeholder="Translation"
                                value={form.englishTranslation}
                                onChange={(event) => handleFormChange(event, index)}
                            ></textarea>
                            <button type="button" className="removeCardButton" onClick={() => removeFields(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-center">
                    <button type="button" className="addCard btn btn-outline-secondary" onClick={addFields}>Add Card</button>
                    <button type="button" className="submitNewAssignment btn btn-primary" onClick={submit}>Create Lesson</button>
                </div>
                {error && <p className="text-center text-danger">{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
}

export default CreateAssignment;