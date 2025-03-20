import React from "react"
import new_task from "../images/new_task.svg";


function Task(){
    return(
        <div className={`flex flex-col border-1 p-2 rounded-2xl ToDo mt-3 text-left justify-center items-center h-35`}>
            <a href="/task">
                <img src={new_task} alt="Nova tarefa" />
            </a>
        </div> 
);
}

export default Task;