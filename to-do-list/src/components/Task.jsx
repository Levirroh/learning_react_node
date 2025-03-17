import React from "react"

function Task({id, user, title, description, subject, date, status}){
    return(
        <div className={`flex justify-between items-center flex-col border-1 p-2 rounded-2xl ${status} mt-3 text-left`}>
            id: {id} <br/>
            {user} - {title} <br/>
            {description} - {subject} <br/>
            {date}<br/>
        </div> 
);
}

export default Task;