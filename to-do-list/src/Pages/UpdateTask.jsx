import React from "react"; 
import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"
import { useParams, useNavigate } from "react-router-dom";

function UpdateTask() {
    const { id } = useParams();

    try {

        const response = fetch("http://localhost:8800/getTaskById",  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( id )
    });
        const taskData = response.json();

        if(!response.ok){
            throw new Error('Error to get Task');
        }
    } catch (e) {
        console.log('Error to get task: ', e);
    }


    async function update(event){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const description = formData.get("description");
        const subject = formData.get("subject");

        try {

            const response = await fetch("http://localhost:8800/updateTask",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, title, description, subject })
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
 
    return (
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Atualizar Tarefa</h1>
                <form>
                    <Input label="Título:" name="title" value={id} />
                    <TextArea label="Descrição:" name="description" />
                    <Input label="Assunto:" name="subject" />
                    <div className="flex items-center justify-center">
                        <Submit text="Atualizar" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UpdateTask;
