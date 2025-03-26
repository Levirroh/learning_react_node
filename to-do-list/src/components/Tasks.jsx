import React from "react";
import Task from "../components/Task"
import NewTask from "../components/NewTask"

function Tasks({ tasks = [] }) {
    return (
        <section className="flex h-svh w-svw justify-evenly">
            <div id="ToDo" className="text-center w-1/4">
                <p id="todo">TO DO</p>
                <ul>
                    <NewTask />
                    {tasks.filter(task => task.status_task === "ToDo").map((task, index) => (
                        <Task key={index}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task} />
                    ))}
                </ul>
            </div>
            <div id="Doing" className="text-center w-1/4">
                <p>Doing</p>
                <ul>
                    {tasks.filter(task => task.status_task === "Doing").map((task, index) => (
                        <Task key={index}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task} />
                    ))}
                </ul>
            </div>
            <div id="Done" className="text-center w-1/4">
                <p>Done</p>
                <ul>
                    {tasks.filter(task => task.status_task === "Done").map((task, index) => (
                        <Task key={index}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Tasks;
