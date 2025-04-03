import { con } from "../connection.js";
import { useParams } from "react-router-dom";

export const get_tasks = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM tasks WHERE user_task = ?";
    const values = [id_user];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar tarefas:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const new_task = (req, res) => {
    const { title, description, subject, id_user } = req.body;

    if (!title || !description || !subject || !id_user) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) VALUES (?, ?, ?, ?, ?)";
    const values = [id_user, title, description, subject, "ToDo"];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao criar tarefa:", err);
            return res.status(500).json({ error: "Erro ao criar tarefa no banco de dados." });
        }

        res.status(201).json({ id: result.insertId, message: "Tarefa criada com sucesso!" });
    });
};


export const update_task = (req, res) => {
    const {id, title, description, subject} = req.body;

    const query = "UPDATE tasks SET title_task= ?, description_task = ?, subject_task = ? WHERE id_task = ?";
    const values = [title, description, subject, id];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar tarefa:", err);
            return res.status(500).json({ error: "Erro ao atualizar tarefa no banco." });
        }

        res.status(201).json({ id: result.insertId, message: "Tarefa atualizada com sucesso!" });
    });
}

export const get_task_by_id = (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM tasks WHERE id_task = ?";

    con.query(query, [id], (err, data) => {
        if (err) {
            console.error("Erro ao buscar tarefa:", err);
            return res.status(500).json({ error: "Erro ao buscar tarefa no banco de dados." });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada!" });
        }

        return res.status(200).json(data[0]);
    });
};