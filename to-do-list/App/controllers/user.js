import { con } from "../connection.js";

export const getUsers = (_, res) => {
    const query = "SELECT * FROM users";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};


export const login_user = async (req, res) => {
    const { login, password } = req.body;

    const query = "SELECT * FROM users WHERE name_user = ? OR email_user = ?";
    const values = [login, login];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).json({ error: "Erro ao entrar com usuário." });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "Usuário não encontrado." });
        }

        const user = result[0]; 

        if (user.password_user !== password) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        res.status(200).json({
            id_user: user.id_user, 
            name_user: user.name_user,
            email_user: user.email_user,
            function_user: user.function_user
        });
    });
};