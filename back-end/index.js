const express = require("express");
const PORT = 2000;
const server = express();
const cors = require("cors");
const db = require("./models");
const path = require("path");

server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "public")));

const {
  authRouters,
  postRouters,
  likeRouters,
  commentControllers,
  profileRouters,
} = require("./routers");

server.use("/api/auth", authRouters);
server.use("/api/post", postRouters);
server.use("/api/like", likeRouters);
server.use("/api/comment", commentControllers);
server.use("/api/profile", profileRouters);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
