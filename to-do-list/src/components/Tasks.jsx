import React from "react";

function Tasks({tasks}) {
    return (
        <section>
            <div id="ToDo">
            <p>TO DO</p>
            <ul>
                {tasks.filter(task => task.status_task === "ToDo").map((task, index) => (
                <li key={index}>{task.id_task} - {task.status_task}</li> 
                ))}
            </ul>
            </div>
            <div id="Doing">
            <p>Doing</p>
            <ul>
                {tasks.filter(task => task.status_task === "Doing").map((task, index) => (
                <li key={index}>{task.id_task} - {task.status_task}</li> 
                ))}
            </ul>
            </div>
            <div id="Done">
            <p>Done</p>
            <ul>
                {tasks.filter(task => task.status_task === "Done").map((task, index) => (
                <li key={index}>{task.id_task} - {task.status_task}</li> 
                ))}
            </ul>
            </div>
        </section>
    );
}


export default Tasks;
