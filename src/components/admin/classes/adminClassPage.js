import React from 'react'
import ViewClasses from './viewClassesAdmin'
import CreateClass from './createClassAdmin';

const AdminClassPage = () => {
    return (
        <div>
        <h1> Class Page </h1>
            <CreateClass></CreateClass>
            <ViewClasses></ViewClasses>
        </div>
    );
}

export default AdminClassPage