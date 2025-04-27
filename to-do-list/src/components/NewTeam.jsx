import React from "react"
import new_task from "../images/new_task.svg";
import team_icon from "../images/team_icon.png";


function NewTeam(){
    return(
        <div className={`flex flex-col border-1 p-2 rounded-2xl ToDo mt-3 text-left justify-center items-center h-25 w-1/6`}>
            <a href="/task" className="w-full h-full flex justify-center items-center ">
            <div className="flex justify-center items-center">
                <img src={team_icon} className="h-20" />
                <img src={new_task} alt="Nova tarefa" className="h-13" />
            </div>
            </a>
        </div> 
);
}

export default NewTeam;