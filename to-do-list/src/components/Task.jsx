import React from "react";

function Task({ id, user, title, description, subject, date, status, selectedTask, setSelectedTask, color }) {
    function showTask() {
        if (selectedTask?.id === id) {
            setSelectedTask(null); 
        } else {
            setSelectedTask({ id, user, title, subject, description, status, date });
        }
    };
    return (
       <div className={`flex flex-col gap-2 border rounded-2xl shadow-sm p-4 transition-all hover:shadow-md hover:scale-[1.01] ${status} ${color} cursor-pointer mt-3`}
        onClick={showTask} >
            <p className="text-xs text-gray-600">Tarefa n°: {id}</p>
            <h3 className="text-base font-semibold text-gray-800 truncate">Título: {title}</h3>
            <p className="text-sm text-gray-700 italic">Descrição:</p>
            <p className="text-sm text-gray-700 p-2">{subject}</p>
        </div>

    );
}

export default Task;
