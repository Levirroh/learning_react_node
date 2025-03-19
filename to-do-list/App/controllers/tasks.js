import { con } from "../connection.js";

export const getTasks = (req, res) => {
    const { id_user } = req.body;
    const query = "SELECT * FROM tasks WHERE user_task = ?";
    const values = id_user;

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar tarefas:", err);
            return res.status(500).json({ error: "Erro ao buscar tarefas." });
        }

        return res.status(200).json(data);
    });
};


export const getToDoTasks = (_, res) => {
    const query = "SELECT * FROM tasks WHERE status_task = 'ToDo'";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};

export const getDoingTasks = (_, res) => {
    const query = "SELECT * FROM tasks WHERE status_task = 'Doing'";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};

export const getDoneTasks = (_, res) => {
    const query = "SELECT * FROM tasks WHERE status_task = 'Done'";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};