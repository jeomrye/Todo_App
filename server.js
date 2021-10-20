const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const morgan = require("morgan");

// morgan 사용
app.use(morgan("dev"));

// test를 위한 기본 라우팅 설정
app.get("/", (req, res) => {
  res.send("NodeJs Server on");
});

app.listen(port, () => {
  console.log(`Express server has Started on port ${port}`);
});

// mongoose 설정
mongoose.connect("mongodb:// 로 시작하는 몽고디비 URI", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to mongodb Server");
});
