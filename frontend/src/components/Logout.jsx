import React,{useState} from "react";
import {useNavigate} from "react-router-dom";



function Logout(){
    const [isLoggedin, setIsLoggedin] = useState(true);
    const navi=useNavigate();

    function handleLogout(){
        setIsLoggedin(false);
        localStorage.removeItem('token');
        navi('/');
    }

    return(

        <div>
            <button className="logout" onClick={handleLogout}>Logout</button>
            
        </div>
    )
}

export default Logout;