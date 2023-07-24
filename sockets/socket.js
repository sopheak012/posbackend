const socketio = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your frontend origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected to the socket");

    //joinRoom socket
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("orderSubmitted", (username) => {
      console.log(`Order updated to user ${username}`);

      io.to(username).emit("orderUpdated");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected from the socket");
    });
  });
};

module.exports = {
  initializeSocket,
  io,
};
