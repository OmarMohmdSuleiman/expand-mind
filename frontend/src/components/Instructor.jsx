import React from "react";


function Instructors(props){
    return (<li><h2>{props.name}</h2>
    <h3>{props.course}</h3>
    <button onClick={props.onDelete} style={{ color: "red" }}>
        Delete
      </button></li>
    );
}

export default Instructors;