import userRoutes from "./routes/users.js";

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors());

app.use("/", userRoutes)

app.listen(8800);