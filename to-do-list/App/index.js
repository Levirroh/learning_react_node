import express from "express";
import userRoutes from "./routes/routes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data); 
    });

    socket.on("disconnect", () => {
    });
});

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

const PORT = 8800;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
