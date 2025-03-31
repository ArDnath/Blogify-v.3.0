import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../utils/AuthContext";


const Logout: React.FC = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout= async ()=>{
        try{
            await axios.post(
                "http://localhost:8080/api/v1/auth/signout",
                {withCredentials: true}
            );

            logout();

            navigate("/login");
        }
        catch(error){
            console.error("Logout Error:", error);
            alert("Failed to log out. Please try again.");
        }
    }
    
    return (
        <button
        onClick={handleLogout}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
            Logout
        </button>
    );
}

export default Logout;
