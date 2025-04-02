import React, { useState, useEffect } from "react"; import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"
import { useParams, useNavigate } from "react-router-dom";

function UpdateTask() {
    const { id } = useParams();
    const [task, setTask] = useState({ title_task: "", description_task: "", subject_task: "" });

    useEffect(() => {
        async function getTaskById(){
            try{
                const response = await fetch(`http://localhost:8800/getTaskById/${id}`, {
                    method: "GET",  
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok){
                    throw new Error("Erro ao obter tarefa");
                }
                const taskData = await response.json();
                setTask(taskData); 
            } catch (e){
                console.log('Error to create task: ', e);
            };
        }
        getTaskById();
    }, [id]);


    
    console.log(task);
    return (
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Atualizar Tarefa</h1>
                {id}
                <form>
                    <Input label="Título:" name="title" value={task.title_task}/>
                    <TextArea label="Descrição:" name="description" value={task.description_task}/>
                    <Input label="Assunto:" name="subject" value={task.subject_task}/>
                    <div className="flex items-center justify-center">
                        <Submit text="Atualizar" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UpdateTask;
