import { con } from "../connection.js";

export const getTasks = (req, res) => {
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
