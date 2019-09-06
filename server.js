const express = require("express");

// const userRouter = require("./users/userRouter");
// const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());

// server.use("/posts", postRouter);
// server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).send(`<h2>It's working!!</h2>`);
});

module.exports = server;
