import React from "react";
import new_task from "../images/new_task.svg";
import { useParams } from "react-router-dom";

function NewTeamTask() {
    const { id } = useParams();
    return (
        <div className="flex flex-col border-1 p-2 rounded-2xl ToDo mt-3 text-left justify-center items-center h-35">
            <a href={`/Teamtask/${id}`} className="w-full h-full flex justify-center items-center">
                <img src={new_task} alt="Nova tarefa de time" className="h-13" />
            </a>
        </div>
    );
}

export default NewTeamTask;
