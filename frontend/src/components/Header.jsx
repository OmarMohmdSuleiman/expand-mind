import React from "react";
import Logout from "./Logout";


function Header(){
    return(
        <div className="header">
            <div className="project_name">Expandmind</div>
            <Logout />
        </div>
    )
}
export default Header;