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
        <section className="flex h-screen w-screen justify-evenly bg-gray-100 pt-16 px-4 gap-6">
            <div id="ToDo" className="w-1/4 bg-white rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">TO DO</h2>
                <ul className="space-y-2">
                <NewTask />
                {tasks.filter(task => task.status_task === 1).map((task) => (
                    <Task
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    description={task.description_task}
                    subject={task.subject_task}
                    date={task.date_task}
                    status={task.status_task}
                    color={task.color_task}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    />
                ))}
                </ul>
            </div>  
            <div id="Doing" className="w-1/4 bg-white rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Doing</h2>
                <ul className="space-y-2">
                {tasks.filter(task => task.status_task === 2).map((task) => (
                    <Task
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    description={task.description_task}
                    subject={task.subject_task}
                    date={task.date_task}
                    status={task.status_task}
                    color={task.color_task}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    />
                ))}
                </ul>
            </div>
            <div id="Done" className="w-1/4 bg-white rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Done</h2>
                <ul className="space-y-2">
                {tasks.filter(task => task.status_task === 3).map((task) => (
                    <Task
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    description={task.description_task}
                    subject={task.subject_task}
                    date={task.date_task}
                    status={task.status_task}
                    color={task.color_task}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    />
                ))}
                </ul>
            </div>
            {selectedTask && (
                <div id="task_selected" className="absolute top-20 right-6 bg-white border border-gray-300 shadow-xl rounded-xl p-6 w-[28rem] z-50">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-800 text-lg">Tarefa #{selectedTask.id}</p>
                    <button className="text-gray-500 hover:text-red-500 text-xl font-bold" onClick={() => setSelectedTask(null)}>×</button>
                </div>

                <div className="space-y-2 text-gray-700 text-sm">
                    <p><strong>Título:</strong> {selectedTask.title}</p>
                    <p><strong>Status:</strong> {selectedTask.status}</p>
                    <p><strong>Descrição:</strong> {selectedTask.description}</p>
                    <p><strong>Matéria:</strong> {selectedTask.subject}</p>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <a href={`/update/${selectedTask.id}`}>
                    <button className="px-4 py-2 bg-blue-200 text-black rounded hover:bg-blue-300">Atualizar</button>
                    </a>
                    <button onClick={() => deleteTask()} className="px-4 py-2 bg-red-300 text-black rounded hover:bg-red-400">Deletar</button>
                    <button onClick={() => setSelectedTask(null)} className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">Fechar</button>
                </div>

                <div className="flex justify-center gap-6 text-2xl mt-4">
                    <span title="To Do" className="cursor-pointer" onClick={() => changeStatus("ToDo", selectedTask.id)}>📝</span>
                    <span title="Doing" className="cursor-pointer" onClick={() => changeStatus("Doing", selectedTask.id)}>🔄</span>
                    <span title="Done" className="cursor-pointer" onClick={() => changeStatus("Done", selectedTask.id)}>✅</span>
                </div>
                </div>
            )}
        </section>

    );
}

export default Tasks;
