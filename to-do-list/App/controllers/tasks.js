import { con } from "../connection.js";

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
    const { title, description, subject } = req.body;
    if (!title || !description || !subject) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }
    try {
        const query = "INSERT INTO tasks (user_task, function_user, email_user, password_user) VALUES(?,?,?,?)";
        const values = [name_user, function_user, email_user, password_user];

        con.query(query, values, (err, result) => {
                if (err) {
                    console.error("Erro ao inserir usuário:", err);
                    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
                }

                res.status(201).json({ id: result.insertId, name_user, function_user, email_user });
            });


    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};