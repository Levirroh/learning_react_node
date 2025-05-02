import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import TeamIcon from "../components/TeamIcon"
import NewTeam from "../components/NewTeam"

function Teams() {
    const [teams, setTeams] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

    function toggleMenu() {
        setIsMenuOpen(prev => !prev);
    }

    function newTeamPopUp() {
        setPopUp(!popUp);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          navigate("/login");
        }
      }, [navigate]);

    async function getUserTeams() {
        if (user){
            try {
                const response = await fetch("http://localhost:8800/getUserTeams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_user: user.id_user })
                });

                const data = await response.json();

                if (data.length === 0) {
                    console.log("Nenhum time encontrado para este usuário.");
                    }
        
                    setTeams(data);
            } catch (e) {
                console.error("Erro ao buscar times:", e);
            }
        }
    }

    useEffect(() => {
        getUserTeams()
    },[user]);

    async function createTeam() {
        const newTeamName = document.getElementById("newTeamName").value;
        if (user){
            try {
                const response = await fetch("http://localhost:8800/createTeam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newTeamName , owner: user.id_user })
                });
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log("Nenhum time encontrado para este usuário.");
                }
        
            } catch (e) {
                console.error("Erro ao criar time:", e);
            }
        };
        setPopUp(false);
        setNewTeamName(""); 
        getUserTeams();
    }



    return(
        <section>
            <Header title="Teams" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <section className='pl-3'>

                <h1>Times</h1>
                <p>Seus times:</p>
                <div className='flex gap-5'>
                    {teams.map((team) => (
                            <TeamIcon key={team.id_team_members}
                            nomeDoTime={team.name_team}
                            id_team={team.id_team}
                            funcao={team.role_user}/>
                        ))}
                </div>
                <p>Criar novo time</p>
                <div className='min-w-300'>
                    <NewTeam popUp={popUp} setPopUp={setPopUp}/>
                </div>
                <small>Templates de times prontos</small>
                <div className='flex gap-5'>
                    <div className='p-3 bg-black'></div>
                    <div className='p-3 bg-black'></div>
                    <div className='p-3 bg-black'></div>
                    <div className='p-3 bg-black'></div>
                    <div className='p-3 bg-black'></div>
                </div>
            </section>

            {popUp && (<div className='absolute flex top-0 h-screen w-screen p-2 justify-center items-center'>
                <div className='bg-blue-700 h-[17vh] w-[53vw] rounded-2xl' >
                    <div className='flex justify-end w-full pr-6 pt-2'>
                        <button className='text-black font-bold cursor-pointer' onClick={newTeamPopUp}>X</button>
                    </div>
                    <div className='flex items-center justify-center h-[6vh]'>
                        <label htmlFor="newTeamName" className='bg-white p-2'>Nome do novo time:</label>
                        <input className='bg-white p-2' name='newTeamName' id="newTeamName" placeholder='Ex.: escola' onChange={(e) => setNewTeamName(e.target.value)}/>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <button className='bg-blue-400 rounded-sm pt-2 pb-2 pl-5 pr-5' onClick={createTeam}>Criar</button>
                    </div>
                </div>
            </div>)};
        </section>
    );
}

export default Teams;