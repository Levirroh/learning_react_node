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

                res.status(201).json({ id: result.insertId, name_user, function_user, email_user });
            });


    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
}


export const login_user = async (req, res) => {
    const { login, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE name_user = ? OR email_user = ?";
        const values = [login, login];

        con.query(query, values, async (err, results) => {
            if (err) {
                console.error("Erro ao buscar usuário:", err);
                return res.status(500).json({ error: "Erro ao entrar com usuário." });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Usuário não encontrado." });
            }

            const user = results[0];

            if (password !== user.password_user) {
                return res.status(401).json({ error: "Senha incorreta." });
            }

            res.status(200).json({
                id: user.id,
                name_user: user.name_user,
                email_user: user.email_user,
                function_user: user.function_user
            });
        });

    } catch (error) {
        console.error("Erro interno:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
}