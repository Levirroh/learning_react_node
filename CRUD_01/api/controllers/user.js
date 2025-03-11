import { connection } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    connection.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
}