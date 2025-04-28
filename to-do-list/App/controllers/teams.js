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


export const new_task = (req, res) => {
    const { title, description, subject, id_user, id_team } = req.body;

    if (!title || !description || !subject || !id_user) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [id_user, title, description, subject, "ToDo", id_team];

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

    const query = "SELECT * FROM tasks INNER JOIN task_status ON task_status.id_status = tasks.status_task WHERE tasks.user_task = ? AND tasks.team_task IS NOT NULL";
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

    var creationTime = Date.now(); 


    const query = "INSERT INTO teams (name_team, owner_team, creation_team) VALUES (?,?,?)";
    const values = [name, owner, creationTime];


    if (!name || !owner || !creationTime) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }



    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar times:", err);
            return res.status(500).json({ error: "Erro ao buscar tarefas", details: err });
        }

        res.status(201).json({ message: "Tarefa criada com sucesso!" });
    });
};