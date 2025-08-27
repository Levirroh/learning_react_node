import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import TextArea from "../components/TextArea";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateTask() {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [task, setTask] = useState({ title_task: "", description_task: "", subject_task: "" });

    useEffect(() => {
        async function getTaskById() {
            try {
                const response = await fetch(`http://localhost:8800/getTaskById/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Erro ao obter tarefa");
                }
                const taskData = await response.json();
                setTask(taskData);
            } catch (e) {
                console.log("Erro ao buscar tarefa: ", e);
            }
        }
        getTaskById();
    }, [id]);

    async function update(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8800/updateTask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    title: task.title_task,
                    description: task.description_task,
                    subject: task.subject_task
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar tarefa");
            }
            alert("Tarefa alterada com sucesso!");
            navigate("/tasks");
        } catch (e) {
            console.log("Erro ao atualizar tarefa: ", e);
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    }

    return (
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Atualizar Tarefa</h1>
                <form onSubmit={update}>
                    <Input 
                        label="Título:" 
                        name="title_task" 
                        value={task.title_task} 
                        onChange={handleInputChange} 
                    />
                    <TextArea 
                        label="Descrição:" 
                        name="description_task" 
                        value={task.description_task} 
                        onChange={handleInputChange} 
                    />
                    <Input 
                        label="Assunto:" 
                        name="subject_task" 
                        value={task.subject_task} 
                        onChange={handleInputChange} 
                    />
                    <div className="flex items-center justify-center">
                        <Submit text="Atualizar" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UpdateTask;
