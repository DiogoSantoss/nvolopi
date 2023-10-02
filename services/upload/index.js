import express from "express";

const port = "3000";

const app = express();

app.get("/", (req, res) => {
    res.send("Express stuff")
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});