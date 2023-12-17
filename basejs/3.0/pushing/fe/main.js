console.log("pusher called");
var socket = io("localhost:3000");
function pushMessage() {
  socket.emit("chat message", "pusher api called");
}
