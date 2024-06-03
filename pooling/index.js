const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const user = require("./routes/user");
app.use(cors());
app.use(bodyparser.json());
app.use("/user", user);
app.get("/", (req, res, next) => {
  res.send("<h3>Welcome</h3>");
});

const server = require("http").createServer(app);

server.listen(3001, (err) => {
  if (!err) {
    console.log("Server started at port 3001");
  } else {
    console.log("Error while starting server");
  }
});
