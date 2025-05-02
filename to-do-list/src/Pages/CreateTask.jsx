import React, { useEffect, useState } from 'react';
import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"
import { useNavigate, useParams } from "react-router-dom";


function CreateTask() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const id_user = storedUser ? JSON.parse(storedUser).id_user : null;
    const { id } = useParams();
    async function create(event){
        if (id){
            event.preventDefault(); 
            const formData = new FormData(event.target);
            const title = formData.get("title");
            const description = formData.get("description");
            const subject = formData.get("subject");

            try {

                const response = await fetch("http://localhost:8800/newTeamTask",  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, subject, id_user, id })
            });
                const taskData = await response.json();

                if(!response.ok){
                    throw new Error('Error to create task');
                }

                if (taskData){
                    alert("Cadastro realizado com sucesso!");
                    navigate(`/Team/${id}`)    
                }

            } catch (e) {
                console.log('Error to create task: ', e);
            }
        } else {
            event.preventDefault(); 
            const formData = new FormData(event.target);
            const title = formData.get("title");
            const description = formData.get("description");
            const subject = formData.get("subject");

            try {

                const response = await fetch("http://localhost:8800/newTask",  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, subject, id_user })
            });
                const taskData = await response.json();

                if(!response.ok){
                    throw new Error('Error to create task');
                }

                if (taskData){
                    alert("Cadastro realizado com sucesso!");
                    navigate(`/menu`)    
                }

            } catch (e) {
                console.log('Error to create task: ', e);
            }
        }
    };
    // ainda nao pode ser usado pois o codigo nao tem
    // como saber se é um team ou user sozinho

    // useEffect(() => {
    //     async function getSubjects() {
    //     try {
    //         const response = await fetch("http://localhost:8800/getSubjects", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ id_team })
    //         });

    //         const data = await response.json();

    //         if (data.length === 0) {
    //         console.log("Nenhuma tarefa encontrada para este usuário.");
    //         }

    //     } catch (e) {
    //         console.error("Erro ao buscar tarefas:", e);
    //     }
    //     }

    // });

    return(
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Crie uma tarefa:</h1>
                <form onSubmit={create}>
                    <Input label="Título:" name="title"/>
                    <TextArea label="Descrição:" name="description"/>
                    <Input label="Assunto:" name="subject"/>
                    <div className="flex items-center justify-center">
                        <Submit text="Criar" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateTask;