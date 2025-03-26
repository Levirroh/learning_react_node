import React, { useState } from "react";

function Task({ id, user, title, description, subject, date, status }) {
    const [selectedTask, setSelectedTask] = useState(null);

    const showTask = () => {
        setSelectedTask({ id, user, title, description, subject, date });
    };

    return (
        <div>
            <div 
                className={`flex flex-col border-1 p-2 rounded-2xl ${status} mt-3 text-left cursor-pointer`} 
                onClick={showTask}
            >
                id: {id} <br/>
                user: {user}<br/>
                title: {title} <br/>
                description: {description}<br/>
                subject: {subject} <br/>
                {date}<br/>
            </div> 

            {selectedTask && (
                <div id="task_selected">
                    <h3 className="text-lg font-bold">Tarefa Selecionada</h3>
                    <p><strong>ID:</strong> {selectedTask.id}</p>
                    <p><strong>User:</strong> {selectedTask.user}</p>
                    <p><strong>Title:</strong> {selectedTask.title}</p>
                    <p><strong>Description:</strong> {selectedTask.description}</p>
                    <p><strong>Subject:</strong> {selectedTask.subject}</p>
                    <p><strong>Date:</strong> {selectedTask.date}</p>
                </div>
            )}
        </div>
    );
}

export default Task;
