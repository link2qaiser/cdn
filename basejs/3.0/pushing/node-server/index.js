var port = 1337;
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log(socket.id);
  socket.on("pass_to_server", function (data) {
    console.log(data);
    socket.broadcast.emit("pass_to_output", data);
  });
});
httpServer.listen(port);
