const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3001;
app.use(cors());

const server = http.createServer(app);
var clientArray = {};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
var setClientIndex = function (arg) {
  if (typeof clientArray[arg["uniqueID"]] === "undefined") {
    let tmpArr = [];
    tmpArr.push(arg["socketID"]);
    clientArray[arg["uniqueID"]] = tmpArr;
  } else {
    let tmpArr = clientArray[arg["uniqueID"]];
    tmpArr.push(arg["socketID"]);
    clientArray[arg["uniqueID"]] = tmpArr;
  }
};
io.on("connection", (socket) => {
  /*
  Here we have number of poarameters like
  sokcet.id
  */
  console.log(socket.id);
  socket.on("process_file", (data) => {
    console.log(data);
  });

  socket.on("setID", (arg) => {
    //setClientIndex(arg);
    /*
    Every next code will be under this block when the UniqueID is set
    Note: A UniqueID can be userID or any other id that run this whole process
    */
    // Set Namespace for each user
    //console.log(clientArray);
  });
  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  // });
});

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});
