import { con } from "../connection.js";

export const getUsers = (_, res) => {
    const query = "SELECT * FROM users";

    con.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};
