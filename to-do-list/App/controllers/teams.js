import { con } from "../connection.js";
import { useParams } from "react-router-dom";

export const getUserTeams = (req, res) => {
    const { id_user } = req.body;

    const query = "SELECT * FROM team_members INNER JOIN teams ON teams.id_team = team_members.team_id WHERE user_id = ?;";
    const values = [id_user];

    con.query(query, values, (err, data) => {
        if (err) {
            console.error("Erro ao buscar times:", err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};