import { con } from "../connection.js";
import { useParams } from "react-router-dom";

export const get_chats_user = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM chat JOIN team_members ON team_members.team_id = chat.id_team WHERE team_members.user_id = ?;";
    const values = [id_user];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar chat:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const get_chat_messages = (req, res) => {
    const { id_chat } = req.body;

    const query = "SELECT * FROM message INNER JOIN chat ON message.id_chat = chat.id_chat INNER JOIN users ON users.id_user = message.id_user WHERE chat.id_chat = ?";
    const values = [id_chat];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar mensagens do chat:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};
export const new_chat_message = (req, res) => {
    const { id_chat, id_user, message } = req.body;

    const query = "INSERT INTO message (id_user, id_chat, content_message, time_message) VALUES (?, ?, ?, NOW());";
    const values = [id_user, id_chat, message];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao ao criar nova mensagem:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const create_new_chat = (req, res) => {
    const { id_team, chat_name, chat_desc, chat_subject, chat_image } = req.body;

    const query = "INSERT INTO chat (id_team, name_chat, description_chat, subject_chat, image_chat) VALUES (?, ?, ?, ?, ?);";
    const values = [id_team, chat_name, chat_desc, chat_subject, chat_image];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao criar novo chat:", err);
            return res.status(500).json({ error: "Erro ao criar novo chat", details: err });
        }

        return res.status(200).json({ message: "Chat criado com sucesso", data });
    });
};
