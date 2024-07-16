import React from 'react'
import ViewAssignments from './viewAssignments'
import StudentSearch from '../classes/addStudents';
import CreateAssignment from './createAssignment';

const AdminAssignmentPage = () => {
    return (
        <div>
        <h1> Lesson Page </h1>
            <ViewAssignments></ViewAssignments>
            <CreateAssignment></CreateAssignment>
        </div>
    );
}

export default AdminAssignmentPage