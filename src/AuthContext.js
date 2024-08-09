import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();

/*
Because we intend to wrap the entire app in the auth provider, we have children passed as a prop
*/
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null)

    const handleLogin = (id) => {
        setIsAuthenticated(true)
        console.log("handle login called, student id is", id)
        setUserId(id);
    }

    const handleLogout = () => {
        console.log("Handle logout is being called")
        setIsAuthenticated(false);
        setUserId(null);
    }

    return (
        //.Provider is used to provide the context to the components that need to consume it
        //value prop is an object containing the state and functions you want to share across the application via context
        //children prop represents the nested content inside the AuthProvider component
        <AuthContext.Provider value = {{isAuthenticated, userId, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}