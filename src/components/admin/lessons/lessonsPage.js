import React from 'react'
import ViewAssignments from './viewLessons'
import StudentSearch from '../classes/addStudents';
import CreateAssignment from '../assignments/createAssignment';
import CreateLesson from './createLesson';

const AdminLessonPage = () => {
    return (
        <div>
        <h1> Lesson Page </h1>
            <ViewAssignments></ViewAssignments>
            <CreateLesson></CreateLesson>
        </div>
    );
}

export default AdminLessonPage