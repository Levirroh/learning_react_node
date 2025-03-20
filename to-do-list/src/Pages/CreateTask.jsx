import React from "react"; 
import Input from "../components/Input"
import Submit from "../components/Submit"
import TextArea from "../components/TextArea"

function CreateTask() {
    return(
        <section className="bg-slate-300 h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-sky-300 h-7/10 w-4/10 rounded-2xl p-3">
                <h1>Crie uma tarefa:</h1>
                <form>
                    <Input label="Título:" />
                    <TextArea label="Descrição:"/>
                    <Input label="Assunto:" />
                    <div className="flex items-center justify-center">
                        <Submit text="Criar" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateTask;