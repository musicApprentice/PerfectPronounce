  import React from "react"
  import { Link } from "react-router-dom"
  import { useAuth } from "../../AuthContext"

  const LandingPage = () => {
    const {isAuthenticated} = useAuth();
    return(
    <>
    {!isAuthenticated && (
    <nav>
        <ul>
            <h2>
            <Link to="/createAccount">Create Account</Link>
            </h2>
            <h2>
            <Link to="/login">Login to Account</Link>
            </h2>
        
        </ul>
    </nav>
    )}
    </>)
  }
  export default LandingPage
  