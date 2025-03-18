import { con } from "../connection.js";

export const getUsers = (_, res) => {
    const query = "SELECT * FROM users";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};

export const register_user = async (req, res) => {
    const { name_user, function_user, email_user, password_user } = req.body;
    if (!name_user || !function_user || !email_user || !password_user) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }
    try {
        const query = "INSERT INTO users (name_user, function_user, email_user, password_user) VALUES(?,?,?,?)";
        const values = [name_user, function_user, email_user, password_user];

        con.query(query, values, (err, result) => {
                if (err) {
                    console.error("Erro ao inserir usuário:", err);
                    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
                }

                return res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId: result.insertId });
            });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
}
