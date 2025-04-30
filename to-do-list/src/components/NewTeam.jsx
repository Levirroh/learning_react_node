import React from "react"
import new_task from "../images/new_task.svg";
import team_icon from "../images/team_icon.png";


function NewTeam({popUp, setPopUp}){
    function newTeamPopUp() {
        setPopUp(!popUp);
    }
    return(
        <div className={`flex flex-col border-1 p-2 rounded-2xl ToDo mt-3 text-left justify-center items-center h-25 w-1/6 hover:cursor-pointer`} onClick={newTeamPopUp}>
            <div className="flex justify-center items-center">
                <img src={team_icon} className="h-20" />
                <img src={new_task} alt="Nova tarefa" className="h-13" />
            </div>
        </div> 
);
}

export default NewTeam;