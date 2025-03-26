import React, { useState } from "react";
import Task from "../components/Task";
import NewTask from "../components/NewTask";

function Tasks({ tasks = [] }) {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <section className="flex h-screen w-screen justify-evenly">
            <div id="ToDo" className="text-center w-1/4">
                <p>TO DO</p>
                <ul>
                    <NewTask />
                    {tasks.filter(task => task.status_task === "ToDo").map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    ))}
                </ul>
            </div>
            <div id="Doing" className="text-center w-1/4">
                <p>Doing</p>
                <ul>
                    {tasks.filter(task => task.status_task === "Doing").map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    ))}
                </ul>
            </div>
            <div id="Done" className="text-center w-1/4">
                <p>Done</p>
                <ul>
                    {tasks.filter(task => task.status_task === "Done").map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
                            user={task.user_task}
                            title={task.title_task}
                            description={task.description_task}
                            subject={task.subject_task}
                            date={task.date_task}
                            status={task.status_task}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    ))}
                </ul>
            </div>
            
            {selectedTask && (
                <div id="task_selected">
                    <div>
                        <h3 className="bold text-2xl">{selectedTask.title}</h3>
                        <p>{selectedTask.id}</p>
                    </div>
                    <p>User: {selectedTask.user}</p>
                    <p>Description: {selectedTask.description}</p>
                    <p>Subject: {selectedTask.subject}</p>
                    <button 
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => setSelectedTask(null)}
                    >
                        Fechar
                    </button>
                </div>
            )}
        </section>
    );
}

export default Tasks;
