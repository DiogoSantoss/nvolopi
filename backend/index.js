import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = "3000";


app.get("/", (req, res) => {
    res.send("Express stuff")
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});