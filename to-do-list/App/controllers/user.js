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

export const get_user_settings = async (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM user_preferences WHERE id_user = ?";
    const values = [id_user];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao buscar configurações:", err);
            return res.status(500).json({ error: "Erro ao buscar configurações:" });
        }
        return res.status(200).json(result)

    });
};

export const get_user_notifications = async (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT message.id_chat, COUNT(*) AS unread_count FROM message JOIN chat_members ON chat_members.id_chat = message.id_chat WHERE chat_members.id_user = ? AND message.id_user != ? AND NOT EXISTS ( SELECT 1 FROM message_reads WHERE message_reads.id_user = ? AND message_reads.id_message = message.id_message)";
    const values = [id_user, id_user, id_user];

    con.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao buscar notificações:", err);
            return res.status(500).json({ error: "Erro ao buscar notificações:" });
        }
        return res.status(200).json(result)

    });
};