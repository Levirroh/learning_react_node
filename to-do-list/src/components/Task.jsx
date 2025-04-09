import React from "react";

function Task({ id, user, title, description, subject, date, status, selectedTask, setSelectedTask }) {
    const showTask = () => {
        if (selectedTask?.id === id) {
            setSelectedTask(null); 
        } else {
            setSelectedTask({ id, user, title, description, subject, status, date });
        }
    };

    return (
        <div 
            className={`flex flex-col border p-2 rounded-2xl ${status} mt-3 text-left cursor-pointer`} 
            onClick={showTask}
        >
            <p>ID: {id}</p>
            <p>User: {user}</p>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Subject: {subject}</p>
        </div> 
    );
}

export default Task;
