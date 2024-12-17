import React from "react";


function Instructors(props){
    return (<li><h2>{props.name}</h2>
    <h3>{props.course}</h3></li>);
}

export default Instructors;