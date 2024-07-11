import React from 'react'
import UserList from './createUserAdmin/createUserAdmin';
import ViewUsers from './viewUsersAdmin/viewUsersAdmin';
//We want to be able to view all user information here
const AdminUserPage = () => {
    return (
    <div>
        <h1> User Page </h1>
        <UserList></UserList>
        <ViewUsers></ViewUsers>
    </div>
    );
}
export default AdminUserPage