import React from "react";


function Enrollment(props){

    return(
        <li>
      <h2>{props.name}</h2> 
      {props.children} 
    </li>
    );
}
export default Enrollment;