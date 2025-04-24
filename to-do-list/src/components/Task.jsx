import React from "react";

function Task({ id, user, title, description, subject, date, status, selectedTask, setSelectedTask, color }) {
    const showTask = () => {
        if (selectedTask?.id === id) {
            setSelectedTask(null); 
        } else {
            setSelectedTask({ id, user, title, subject, description, status, date });
        }
    };
    return (
        <div 
            className={`flex flex-col border p-2 rounded-2xl ${status} mt-3 text-left cursor-pointer ${color}`} 
            onClick={showTask}
        >
            <p>ID: {id}</p>
            <p>Title: {title}</p>
            <p>Subject: {subject}</p>
        </div> 
    );
}

export default Task;
