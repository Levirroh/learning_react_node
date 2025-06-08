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