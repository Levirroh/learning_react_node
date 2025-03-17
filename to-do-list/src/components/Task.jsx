import React from "react"

function Task({id, user, title, description, subject, date, status}){
    return(
        <li>
            {id} - {status} <br/>
            {user} - {title} <br/>
            {description} - {subject} <br/>
            {date}<br/>
        </li> 
);
}

export default Task;