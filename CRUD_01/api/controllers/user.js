import { connection } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    connection.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
};

export const addUser = (req, res) => {
    const q = "INSERT INTO users(`name_user`, `email_user`, `phone_user`, `nasc_user`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso");
    })
}

export const updateUser = (req, res) => {
    const q = "UPDATE users SET `name_user` = ?, `email_user` = ? `phone_user` = ?, `nasc_user` = ? WHERE `id_user` = ?"

    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso");
    })
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id_user` = ?";
  
    connection.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  };