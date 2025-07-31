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
    const [teamCategoryEdit, setTeamCategoryEdit] = useState("");
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamColor, setNewTeamColor] = useState("#d3d3f8"); 
    const [newTeamImage, setNewTeamImage] = useState("");
    const [newTeamCategory, setNewTeamCategory] = useState("");
    const [teamColorEdit, setTeamColorEdit] = useState("");
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
        if (user){
            try {
                const response = await fetch("http://localhost:8800/createTeam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newTeamName , owner: user.id_user, image: newTeamImage, color: newTeamColor, category: newTeamCategory })
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


    return(
        <section className="min-h-screen bg-gray-50">
            <Header title="Teams" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />

            <div className="p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Times</h1>
                <p className="text-gray-600 mb-4">Seus times:</p>

                <div className="flex flex-wrap gap-5 mb-8">
                {teams.map((team) => (
                    <TeamIcon
                    key={team.id_team_members}
                    nomeDoTime={team.name_team}
                    color={team.color_team}
                    id_team={team.id_team}
                    funcao={team.role_user}
                    category={team.category_team}
                    openConfig={openConfig}
                    setOpenConfig={setOpenConfig}
                    setSelectedTeamConfig={setSelectedTeamConfig}
                    getTeamMembers={getTeamMembers}
                    />
                ))}
                </div>

                <div className="mb-8">
                <p className="text-lg font-medium mb-2">Criar novo time</p>
                <div className="min-w-[300px]">
                    <NewTeam popUp={popUp} setPopUp={setPopUp} />
                    <button
                    onClick={newTeamPopUp}
                    className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                    Novo Time
                    </button>
                </div>
                </div>

                <p className="text-sm text-gray-500 mb-3">Templates de times prontos</p>
                <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                ))}
                </div>
            </div>

            {popUp && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-blue-300 bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg space-y-4">
                    <div className="flex justify-end">
                    <button className="text-gray-600 font-bold" onClick={newTeamPopUp}>
                        ✕
                    </button>
                    </div>
                    <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <label className="w-40 font-medium">*Nome do time:</label>
                        <input
                        className="flex-1 p-2 border rounded-md"
                        placeholder="Ex.: escola"
                        onChange={(e) => setNewTeamName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-40 font-medium">Imagem:</label>
                        <input
                        type="file"
                        className="flex-1"
                        onChange={(e) => setNewTeamImage(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-40 font-medium">Categoria:</label>
                        <input
                        className="flex-1 p-2 border rounded-md"
                        placeholder="Ex.: escola"
                        onChange={(e) => setNewTeamCategory(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-40 font-medium">Cor:</label>
                        <select
                        className="flex-1 p-2 border rounded-md"
                        onChange={(e) => setNewTeamColor(e.target.value)}
                        >
                        <option>vermelho</option>
                        <option>amarelo</option>
                        <option>rosa</option>
                        <option>azul</option>
                        <option>verde</option>
                        <option>roxo</option>
                        <option>laranja</option>
                        <option>cinza</option>
                        <option>preto</option>
                        </select>
                    </div>
                    </div>
                    <div className="flex justify-center pt-4">
                    <button
                        onClick={createTeam}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                        Criar
                    </button>
                    </div>
                </div>
                </div>
            )}

            {openConfig && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-blue-300 bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                    <h2 className="text-xl font-bold">Time: {selectedTeamConfig[1]}</h2>
                    <p><strong>Cor:</strong> {selectedTeamConfig[3]}</p>
                    <p><strong>Tarefas:</strong> {selectedTeamConfig[6]} / {selectedTeamConfig[5]}</p>
                    <p><strong>Categoria:</strong> {selectedTeamConfig[4]}</p>
                    <div>
                    <p className="font-medium mb-1">Integrantes:</p>
                    {teamMembers.map((member) => (
                        <div key={member.id_user} className="border-b py-1">{member.name_user}</div>
                    ))}
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md"
                        onClick={ChangeConfig}
                    >
                        Fechar
                    </button>
                    <button
                        className="bg-yellow-300 px-4 py-2 rounded-md"
                        onClick={UpdateConfigPopUp}
                    >
                        Alterar
                    </button>
                    </div>
                </div>
                </div>
            )}

            {UpdateConfig && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-blue-300 bg-opacity-40 flex justify-center items-center z-50 p-4">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-6">
                    <form onSubmit={UpdateTeam} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <label className="w-36 font-medium">Nome:</label>
                        <input
                        type="text"
                        value={teamNameEdit}
                        onChange={(e) => setTeamNameEdit(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-36 font-medium">Categoria:</label>
                        <input
                        type="text"
                        value={teamCategoryEdit}
                        onChange={(e) => setTeamCategoryEdit(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-36 font-medium">Cor:</label>
                        <select
                        value={teamColorEdit}
                        onChange={(e) => setTeamColorEdit(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        >
                        <option disabled>Selecione...</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="amarelo">Amarelo</option>
                        <option value="rosa">Rosa</option>
                        <option value="azul">Azul</option>
                        <option value="verde">Verde</option>
                        <option value="roxo">Roxo</option>
                        <option value="laranja">Laranja</option>
                        <option value="cinza">Cinza</option>
                        <option value="preto">Preto</option>
                        </select>
                    </div>

                    <div>
                        <p className="font-medium mb-2">Permissões:</p>
                        {teamMembers.map((member, index) => (
                        <div className="flex justify-between items-center mb-2" key={member.id_user}>
                            <span>{member.name_user}</span>
                            <select
                            className="p-1 rounded-md border"
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
                            <option value="Moderador">Moderador</option>
                            <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <input
                        type="submit"
                        value="Salvar"
                        className="px-6 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600"
                        />
                        <button
                        type="button"
                        onClick={UpdateConfigPopUp}
                        className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
                        >
                        Voltar
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