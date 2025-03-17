import React from "react";
import Task from "./Task";


function Tasks({tasks}) {
    return (
        <section className="flex h-svh w-svw justify-evenly"> 
            <div id="ToDo">
                <p>TO DO</p>
                <ul className="bg-blue-200">
                    {tasks.filter(task => task.status_task === "ToDo").map((task, index) => (
                        <Task key={index} 
                        id={task.id_task} 
                        user={task.user_task} 
                        title={task.title_task} 
                        description={task.description_task} 
                        subject={task.subject_task} 
                        date={task.date_task} 
                        status={task.status_task}/>
                    ))}
                </ul>
            </div>
            <div id="Doing">
                <p>Doing</p>
                <ul className="bg-yellow-200">
                    {tasks.filter(task => task.status_task === "Doing").map((task, index) => (
                        <Task key={index} 
                        id={task.id_task} 
                        user={task.user_task} 
                        title={task.title_task} 
                        description={task.description_task} 
                        subject={task.subject_task} 
                        date={task.date_task} 
                        status={task.status_task}/>
                    ))}
                </ul>
            </div>
            <div id="Done">
                <p>Done</p>
                <ul className="bg-green-200">
                    {tasks.filter(task => task.status_task === "Done").map((task, index) => (
                        <Task key={index} 
                        id={task.id_task} 
                        user={task.user_task} 
                        title={task.title_task} 
                        description={task.description_task} 
                        subject={task.subject_task} 
                        date={task.date_task} 
                        status={task.status_task}/> 
                    ))}
                </ul>
            </div>
        </section>
    );
}


export default Tasks;
