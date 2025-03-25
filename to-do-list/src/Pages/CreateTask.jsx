import React from "react"; 
import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"
import { useNavigate } from "react-router-dom";


function CreateTask() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const id_user = storedUser ? JSON.parse(storedUser).id_user : null;

    async function create(event){
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

            alert("Cadastro realizado com sucesso!");
            navigate("/menu")    

        } catch (e) {
            console.log('Error to create task: ', e);
        }

    }; 

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