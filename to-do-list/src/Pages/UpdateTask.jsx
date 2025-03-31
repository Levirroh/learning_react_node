import React from "react"; 
import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"
import { useParams } from "react-router-dom";

function UpdateTask() {
    const { id } = useParams(); 
    return (
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Atualizar Tarefa</h1>
                <p>{id}</p>
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
