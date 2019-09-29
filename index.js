const express = require("express");
const app = express();
const port = process.env.PORT || 8088;

app.get("/", (req, res) => res.send("NodeJS Tarpit!"));

app.listen(port, () => console.log(`Tarpit App listening on port ${port}!`));
