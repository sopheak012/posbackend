const socketio = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: "https://pos-client-o6c1.onrender.com", // Replace with your frontend origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected to the socket");

    socket.on("orderSubmitted", (data) => {
      console.log("Order submitted:", data);

      // Emit the updated data to all connected clients
      io.emit("orderUpdated", data);
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
