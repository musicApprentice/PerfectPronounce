import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolDropdown from '../../universal/createAccount/schoolDropdown';
import AddStudents from './addStudents';
import AddTeachers from './addTeachers';

const CreateClass = () => {
  //setting state variables needed for creating user 
  const [className, setClassName] = useState('');
  const [language, setLanguage] = useState('');
  const [courseNumber, setCourseNumber] = useState('')
  
  const [school, setSchool ] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);



  //navigate is a function that can be used to navigate between routes

  const handleSubmit = (e) => {
    e.preventDefault();
    let students = selectedStudents.map((student) => student._id);
    let teachers = selectedTeachers.map((teacher) => teacher._id);

    const newClass = { className, courseNumber, language, students, teachers, school };
    //on submit button we create a new class object


    //call fetch with a post method where we convert the user's data to data
    fetch("http://localhost:3000/api/classes", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newClass)
    })
      .then(response => {
        if (response.ok) {
          window.alert(`Class created ${newClass.className}`)
          console.log('Class created:', newClass.className);
          setClassName("")
          setCourseNumber("")
          setLanguage("")
          setSchool("")
          setSelectedTeachers([])
          setSelectedStudents([])


        } else {
          throw new Error('Failed to create new class');
        }
      })
  };

  const handleLanguageChange = (e)=> {
    setLanguage(e.target.value);
  }

  const languages  = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish (Kurmanji)",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Odia",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Turkish",
    "Turkmen",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu"
];


  

  return (
    <div>
      <h3> Create Class </h3>
      <form onSubmit={handleSubmit}>
  
       <div>
          <label htmlFor="courseNumber">Course Number:</label>
          <input
            type="text"
            id="courseNumber"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="className">Class Name:</label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>

        <div>
            <label htmlFor = "languages"> Select a Language </label>
            <select id = "languages" value = {language} onChange={handleLanguageChange}>
                <option value = "" disabled> Select a language</option>
                {languages.map((language, index) => (
                    <option key = {index} value = {language}>
                        {language}
                    </option>
               
                )
            )}

            </select>
        </div>
        <div>
        
        </div>
        <SchoolDropdown selectedSchool={school} setSelectedSchool={setSchool} required  />
        <div className="StudentManagement">
          {/* selectedStudents is the name of the prop in AddStudents component, {selectedStudents} 
          is the value from this parent component that we pass to it*/}
            <AddStudents selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} />
        </div>
        <div className="StudentManagement">
            <AddTeachers selectedTeachers={selectedTeachers} setSelectedTeachers={setSelectedTeachers} />
        </div>
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};

export default CreateClass;
