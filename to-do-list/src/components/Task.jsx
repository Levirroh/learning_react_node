import React from "react"

function Task({id, user, title, description, subject, date, status}){
    return(
        <div className={`flex flex-col border-1 p-2 rounded-2xl ${status} mt-3 text-left`}>
            id: {id} <br/>
            user: {user}<br/>
            title: {title} <br/>
            description: {description}<br/>
            subject: {subject} <br/>
            {date}<br/>
        </div> 
);
}

export default Task;