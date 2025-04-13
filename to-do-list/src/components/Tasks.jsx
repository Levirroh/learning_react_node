import React, { useState } from "react";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks = [] }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    async function deleteTask(){
        try {
            const response = await fetch(`http://localhost:8800/delete/${selectedTask.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Tarefa deletada com sucesso!");
                setSelectedTask(null);
                window.location.reload();
            } else {
                alert("Erro ao deletar tarefa.");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    }
    async function changeStatus(status, id){
        try {
            const response = await fetch("http://localhost:8800/changeStatus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status })
            });

            if (response.ok) {
                alert("Tarefa alterada com sucesso!");
                setSelectedTask(null);
                window.location.reload();
            } else {
                alert("Erro ao alterar tarefa.");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    }


    return (
        <section className="flex h-screen w-screen justify-evenly">
            <div id="ToDo" className="text-center w-1/4">
                <p>TO DO</p>
                <ul>
                    <NewTask />
                    {tasks.filter(task => task.status_task === 1).map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
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
                    {tasks.filter(task => task.status_task === 2).map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
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
                    {tasks.filter(task => task.status_task === 3).map((task) => (
                        <Task key={task.id_task}
                            id={task.id_task}
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
                    <div className="flex justify-between w-4/5">
                        <p className="bold">{selectedTask.id}</p>
                        <button className="bold" onClick={() => setSelectedTask(null)} >X</button>
                    </div>
                    <div className="flex justify-evenly items-center w-1/2">
                        <h3 className="bold text-2xl">{selectedTask.title}</h3>
                    </div>
                    <div className="items-center flex flex-col justify-center h-11/12">
                        <p>status: {selectedTask.status}</p>
                        <p>Description: {selectedTask.description}</p>
                        <p>Subject: {selectedTask.subject}</p>
                        <div className="flex items-center justify-center  w-1/2 gap-10">
                            <a href={`/update/${selectedTask.id}`}>
                                <button className="mt-2 px-4 py-2 bg-slate-200 text-black rounded cursor-pointer">
                                    Atualizar
                                </button>
                            </a>
                        </div>
                        <div className="flex items-center justify-center w-1/2 gap-6 text-2xl">
                                <span title="To Do" className="cursor-pointer" onClick={() => changeStatus("ToDo", selectedTask.id)}>📝</span>
                                <span title="Doing" className="cursor-pointer" onClick={() => changeStatus("Doing", selectedTask.id)}>🔄</span>
                                <span title="Done" className="cursor-pointer" onClick={() => changeStatus("Done", selectedTask.id)}>✅</span>
                                </div>
                        <div className="flex items-center justify-center  w-1/2 gap-10">
                            <a>
                                <button className="mt-2 px-4 py-2 bg-slate-200 text-black rounded cursor-pointer" onClick={() => deleteTask()}>
                                    Deletar
                                </button>
                            </a>
                            <button
                                className="mt-2 px-4 py-2 bg-red-400 text-black rounded cursor-pointer"
                                onClick={() => setSelectedTask(null)}
                            >Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Tasks;
