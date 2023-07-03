const socketio = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log("A user connected to the socket");

    // Handle socket events here
    // For example, you can listen for events and emit data to connected clients

    socket.on("disconnect", () => {
      console.log("A user disconnected from the socket");
      // Clean up any resources or handle disconnect logic
    });
  });
};

module.exports = {
  initializeSocket,
  io, // Export the 'io' object if you need to access it in other files
};
