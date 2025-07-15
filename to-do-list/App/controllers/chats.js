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


export const get_chat_users = (req, res) => {
    const { id_chat } = req.body;
    const query = "SELECT * FROM team_members INNER JOIN users ON team_members.user_id = users.id_user WHERE team_id = ?";
    const values = [id_chat];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro buscar usuários:", err);
            return res.status(500).json({ error: "Erro ao buscar novo chat:", details: err });
        }

        return res.status(200).json(data);
    });
};

export const update_chat_users = (req, res) => {
  const { chat_id, users_roles } = req.body;

  if (!chat_id || !Array.isArray(users_roles)) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  const getTeamQuery = "SELECT id_team FROM chat WHERE id_chat = ?";

  con.query(getTeamQuery, [chat_id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar time do chat:", err);
      return res.status(500).json({ error: "Erro interno ao buscar time." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Chat não encontrado." });
    }

    const team_id = result[0].id_team;

    const updatePromises = users_roles.map(({ id_user, role_user }) => {
      return new Promise((resolve, reject) => {
        const updateQuery = `
          UPDATE team_members
          SET role_user = ?
          WHERE team_id = ? AND user_id = ?
        `;
        con.query(updateQuery, [role_user, team_id, id_user], (err, data) => {
          if (err) {
            console.error(`Erro ao atualizar usuário ${id_user}:`, err);
            return reject(err);
          }
          resolve(data);
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        return res.status(200).json({ message: "Cargos atualizados com sucesso." });
      })
      .catch((error) => {
        console.error("Erro ao atualizar cargos:", error);
        return res.status(500).json({ error: "Erro ao atualizar cargos.", details: error });
      });
  });
};


export const get_all_chats_data = (req, res) => {
    const { id_user } = req.body;

    // const query = "SELECT * FROM chat JOIN team_members ON team_members.team_id = chat.id_team WHERE team_members.user_id = ?;";
    // const values = [id_user];

    // con.query(query, values, (err, data) => {
    //     if (err) {
    //         console.error("Erro ao buscar chat:", err);
    //         return res.json(err);
    //     }

    //     return res.status(200).json(data);
    // });
};