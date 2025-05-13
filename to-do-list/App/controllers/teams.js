import { con } from "../connection.js";
import { useParams } from "react-router-dom";

export const getUserTeams = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM team_members INNER JOIN teams ON teams.id_team = team_members.team_id WHERE team_members.user_id = ?";
    const values = [id_user];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar times:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const getTeamMembers = (req, res) => {
    const { id } = req.body;

    const query = "SELECT DISTINCT * FROM users INNER JOIN team_members ON team_members.user_id = users.id_user WHERE team_members.team_id = ?";
    const values = [id];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar usuários do time:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const new_team_task = (req, res) => {
    const { title, description, subject, id_user, id } = req.body;
        console.log(id);

    if (!title || !description || !subject || !id_user || !id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [id_user, title, description, subject, 1, id];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao criar tarefa:", err);
            return res.status(500).json({ error: "Erro ao criar tarefa no banco de dados." });
        }

        res.status(201).json({ id: result.insertId, message: "Tarefa criada com sucesso!" });
    });
};




export const getStatusTeam = (req, res) => {
    const { id_team } = req.body;

    const query = "SELECT * FROM tasks WHERE tasks.team_task = ?";
    const values = [id_team];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar times:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};


export const getTeamTasks = (req, res) => {
    const { id } = req.body;

    const query = "SELECT * FROM tasks INNER JOIN task_status ON task_status.id_status = tasks.status_task WHERE tasks.team_task = ?";
    const values = [id];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar times:", err);
            return res.status(500).json({ error: "Erro ao buscar tarefas", details: err });
        }

        return res.status(200).json(data);
    });
};

export const createTeam = (req, res) => {
    const { name, owner  } = req.body;
    const dataAtual = new Date();
    if (!name || !owner) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    } 


    // YYYY-MM-DD HH:MI:SS
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear()+1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();
    
    var creationTime = ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo; 

    const insertTeamQuery = "INSERT INTO teams (name_team, owner_team, creation_team) VALUES (?, ?, ?)";
    const insertTeamValues = [name, owner, creationTime];

    con.query(insertTeamQuery, insertTeamValues, (err) => {
        if (err) {
            console.error("Erro ao inserir time:", err);
            return res.status(500).json({ error: "Erro ao criar time", details: err });
        }

        const selectTeamQuery = "SELECT id_team FROM teams WHERE name_team = ? AND owner_team = ? AND creation_team = ?";
        const selectTeamValues = [name, owner, creationTime];

        con.query(selectTeamQuery, selectTeamValues, (err, result) => {
            if (err || result.length === 0) {
                return res.status(500).json({ error: "Erro ao buscar o time criado", details: err });
            }

            const idTeam = result[0].id_team;
            const insertMemberQuery = "INSERT INTO team_members (user_id, team_id, role_user) VALUES (?, ?, 'Moderador')";
            const insertMemberValues = [owner, idTeam];

            con.query(insertMemberQuery, insertMemberValues, (err) => {
                if (err) {
                    console.error("Erro ao inserir membro:", err);
                    return res.status(500).json({ error: "Erro ao adicionar membro ao time", details: err });
                }

                return res.status(201).json({ message: "Time criado com sucesso!", teamId: idTeam });
            });
        });
    });
};


export const updateTeam = (req, res) => {
    const { updatedTeam } = req.body;
    const id = updatedTeam.id;
    const name = updatedTeam.name;
    const image = updatedTeam.image;
    const color = updatedTeam.color;
    const category = updatedTeam.category;
    const users = updatedTeam.users;

    const updateTeam = "UPDATE teams SET name_team = ?, image_team = ?, color_team = ?, category_team = ? WHERE id_team = ?";
    const valuesUpdateTeam = [name, image, color, category, id];

    con.query(updateTeam, valuesUpdateTeam, (err, data) => {
        if (err) {
            console.error("Erro ao atualizar time:", err);
            return res.status(500).json({ error: "Erro ao atualizar time", details: err });
        }

        // if (Array.isArray(users) && users.length > 0) {
        //     console.log('Total de usuários a serem atualizados:', users.length);

        //     for (let i = 0; i < users.length; i++) {
        //         const updateTeamMembers = "UPDATE team_members SET role_user = ? WHERE team_id = ? AND user_id = ?";
        //         const values = [users[i].role, id, users[i].id];
    
        //         con.query(updateTeamMembers, values, (err) => {
        //             if (err) {
        //                 console.error("Erro ao atualizar membro do time:", err);
        //             }
        //         });
        //     }
        // } else {
        //     console.log("Nenhum usuário para atualizar.");
        // }

        return res.status(200).json({ message: "Time atualizado com sucesso!" });
    });
};
