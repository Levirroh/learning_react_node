import { con } from "../connection.js";
import { useParams } from "react-router-dom";

export const get_chats_user = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM chat_members INNER JOIN chat ON chat.id_chat = chat_members.id_chat WHERE chat_members.id_user = ?;";
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
    const { id_chat, id_user } = req.body;

    const query = "SELECT message.*, message_reads.id_user AS was_read_by_user FROM message LEFT JOIN message_reads ON message.id_message = message_reads.id_message AND message_reads.id_user = ? WHERE message.id_chat = ? ORDER BY message.time_message;";
    const values = [id_user, id_chat];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar mensagens do chat:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const update_read_message = async (req, res) => {
    const { messages, id_user } = req.body;
    if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "Nenhuma mensagem recebida." });
    }

    const query = "INSERT IGNORE INTO message_reads (id_user, id_message, read_at) VALUES (?, ?, NOW())";

    try {
        await Promise.all(
            messages.map(id_message => 
                new Promise((resolve, reject) => {
                    con.query(query, [id_user, id_message], (err, result) => {
                        if (err) {
                            console.error("Erro ao inserir leitura de mensagem:", err);
                            return reject(err);
                        }
                        resolve(result);
                    });
                })
            )
        );
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar leituras.", details: err });
    }
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
  const {
    id_team,
    chat_name,
    chat_desc,
    chat_subject,
    chat_image,
    id_user
  } = req.body;

  const isPrivate = id_team === "-1";
  const values = isPrivate
    ? [chat_name, chat_desc, chat_subject, chat_image]
    : [id_team, chat_name, chat_desc, chat_subject, chat_image];

  const query = isPrivate
    ? "INSERT INTO chat (name_chat, description_chat, subject_chat, image_chat) VALUES (?, ?, ?, ?);"
    : "INSERT INTO chat (id_team, name_chat, description_chat, subject_chat, image_chat) VALUES (?, ?, ?, ?, ?);";

  con.query(query, values, (err, result) => {
    if (err) {
      console.error("Erro ao criar novo chat:", err);
      return res.status(500).json({ error: "Erro ao criar novo chat", details: err });
    }

    const newChatId = result.insertId;

    insert_user_chat(newChatId, id_user, id_team, res);
  });
};

const insert_user_chat = (chatId, creatorUserId, id_team, res) => {
  if (id_team === "-1") {
    const query = "INSERT INTO chat_members (id_user, id_chat) VALUES (?, ?)";
    const values = [creatorUserId, chatId];

    con.query(query, values, (err, result) => {
      if (err) {
        console.error("Erro ao adicionar usuário no chat privado:", err);
        return res.status(500).json({ error: "Erro ao inserir usuário", details: err });
      }
      return res.status(200).json({ message: "Chat privado criado com sucesso", chat_id: chatId });
    });
  } else {
    const query_members = "SELECT user_id FROM team_members WHERE team_id = ?";
    con.query(query_members, [id_team], (err, members) => {
      if (err) {
        console.error("Erro ao buscar membros do time:", err);
        return res.status(500).json({ error: "Erro ao buscar membros", details: err });
      }

      if (!members || members.length === 0) {
        return res.status(200).json({ message: "Chat criado, mas o time não tem membros", chat_id: chatId });
      }

      const insertQuery = "INSERT INTO chat_members (id_user, id_chat) VALUES ?";
      const insertValues = members.map(member => [member.user_id, chatId]);

      con.query(insertQuery, [insertValues], (err, result) => {
        if (err) {
          console.error("Erro ao inserir membros no chat:", err);
          return res.status(500).json({ error: "Erro ao inserir membros", details: err });
        }
        return res.status(200).json({ message: "Chat de time criado com sucesso", chat_id: chatId });
      });
    });
  }
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


export const get_all_messages_unread_by_chat = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT message.id_chat, COUNT(*) AS unread_count FROM message JOIN chat_members ON chat_members.id_chat = message.id_chat WHERE chat_members.id_user = ? AND message.id_user != ? AND NOT EXISTS ( SELECT 1 FROM message_reads WHERE message_reads.id_user = ? AND message_reads.id_message = message.id_message ) GROUP BY message.id_chat";
    const values = [id_user, id_user, id_user];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar chat:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};