const express = require("express");

const projectRouter = require("./projects/projectRouter.js");
const actionRouter = require("./actions/actionRouter");

const server = express();

server.use(express.json());

server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.get("/", (req, res) => {
  res.status(200).send(`<h2>It's working!!</h2>`);
});

module.exports = server;
