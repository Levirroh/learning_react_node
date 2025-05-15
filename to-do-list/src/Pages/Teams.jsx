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
    const [UpdateConfig, setUpdateConfig] = useState(null);
    const [selectedTeamConfig, setSelectedTeamConfig] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [openConfig, setOpenConfig] = useState(false);
    const [teamNameEdit, setTeamNameEdit] = useState("");
    const [teamColorEdit, setTeamColorEdit] = useState("");
    const [teamCategoryEdit, setTeamCategoryEdit] = useState("");
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

    async function UpdateTeam(e) {
        e.preventDefault(); 
    
        const updatedTeam = {
            id: selectedTeamConfig[0],
            name: teamNameEdit,
            image: null,
            color: teamColorEdit,
            category: teamCategoryEdit,
            users: teamMembers.map(member => ({
                id: member.id_user,
                role: member.role_user
            }))
        };
    
    
        try {
            const response = await fetch("http://localhost:8800/updateTeam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updatedTeam })
            });
    
            const data = await response.json();

            if (response.ok) {
                console.log(data.message); 
                await getUserTeams(); 
                setUpdateConfig(false); 
            } else {
                console.error("Erro na resposta:", data);
            }
        } catch (e) {
            console.error("Erro ao atualizar time:", e);
        }
    }
    
    function ChangeConfig(){
        setOpenConfig(!openConfig);
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
    async function getTeamMembers(id_team) {
        if (user) {
            try {
                const response = await fetch("http://localhost:8800/getTeamMembers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id_team }) 
                });
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log("Nenhum membro encontrado para este time.");
                }
    
                setTeamMembers(data);
            
                
            } catch (e) {
                console.error("Erro ao buscar membros do time:", e);
            }
        }
    }
    function UpdateConfigPopUp() {
        setUpdateConfig(!UpdateConfig);
        setOpenConfig(!openConfig);
    
        if (!UpdateConfig) {
            getTeamMembers(selectedTeamConfig[0]);
            setTeamNameEdit(selectedTeamConfig[1]);
            setTeamColorEdit(selectedTeamConfig[3]);
            setTeamCategoryEdit(selectedTeamConfig[4]);
        } else {
            setTeamNameEdit("");
            setTeamColorEdit("");
            setTeamCategoryEdit("");
        }
    }

    console.log(teams);

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
                            funcao={team.role_user}
                            openConfig={openConfig}
                            setOpenConfig={setOpenConfig}
                            setSelectedTeamConfig={setSelectedTeamConfig}
                            getTeamMembers={getTeamMembers}/>
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
                <div className='bg-blue-400 h-[17vh] w-[53vw] rounded-2xl' >
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
            </div>)}


            {openConfig && (
                <div className='flex absolute top-0 w-screen h-screen justify-center items-center'>
                    <div className='bg-blue-300 p-5 flex flex-col border rounded-2xl shadow-gray-500 shadow-lg'>
                        <div className='flex flex-col'>
                            <p>Nome do time: {selectedTeamConfig[1]}</p>    
                            <p>Integrantes do time:</p>
                            <div>
                            {teamMembers.map((member) => (
                                <div className="flex" key={member.id_user}>
                                    <p>{member.name_user}</p>
                                </div>
                                ))}
                            </div>
                            <p>Cor do time: {selectedTeamConfig[3]}</p>
                            <p>Tarefas do time: {selectedTeamConfig[6]} / {selectedTeamConfig[5]}</p>
                            <p>Categoria do time: {selectedTeamConfig[4]}</p>
                        </div>
                        <div className="flex items-center justify-center gap-10">
                            <button
                                className="mt-2 px-4 py-2 bg-red-200 text-black rounded cursor-pointer"
                                onClick={ChangeConfig}
                            >Fechar</button>
                            <button
                                className="mt-2 px-4 py-2 bg-yellow-100 text-black rounded cursor-pointer"
                                onClick={UpdateConfigPopUp}
                            >Alterar</button>
                        </div>
                    </div>
                </div>
            )}
            {UpdateConfig && (
                <div className='flex absolute top-0 w-screen h-screen justify-center items-center'>
                    <div className='bg-blue-300 p-5 flex flex-col border rounded-2xl'>
                    <form onSubmit={UpdateTeam}>
                        <div className='flex'>
                            <label>Nome do time:</label>
                            <input
                            type="text"
                            value={teamNameEdit}
                            onChange={(e) => setTeamNameEdit(e.target.value)}
                            />
                        </div>
                        
                        <p>Integrantes do time:</p>
                        <div>
                            {teamMembers.map((member) => (
                            <div className="flex justify-between" key={member.id_user}>
                                <p>{member.name_user}</p>
                                <select name="permitionUser"
                                    className='bg-white rounded-2xl pl-2 pr-2'
                                    value={member.role_user}
                                    onChange={(e) => {
                                        const newRole = e.target.value;
                                        const updatedMembers = [...teamMembers];
                                        updatedMembers[index] = {
                                        ...updatedMembers[index],
                                        role_user: newRole
                                        };
                                        setTeamMembers(updatedMembers);
                                    }}
                                    >
                                    <option disabled>Permissões</option>
                                    <option value="Moderador">Moderador</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>
                            ))}
                        </div>

                        <div className='flex'>
                            <p>Cor do time</p>
                            <input
                            value={teamColorEdit}
                            onChange={(e) => setTeamColorEdit(e.target.value)}
                            />
                        </div>

                        <div className='flex'>
                            <p>Categoria do time</p>
                            <input
                            value={teamCategoryEdit}
                            onChange={(e) => setTeamCategoryEdit(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-10">
                            <input
                            className="mt-2 px-4 py-2 bg-green-200 text-black rounded cursor-pointer"
                            value="Salvar"
                            type='submit'
                            />
                            <button
                            className="mt-2 px-4 py-2 bg-red-200 text-black rounded cursor-pointer"
                            onClick={UpdateConfigPopUp}
                            >
                            Fechar
                            </button>
                        </div>
                        </form>

                    </div>
                </div>
            )}
        </section>
    )
}

export default Teams;