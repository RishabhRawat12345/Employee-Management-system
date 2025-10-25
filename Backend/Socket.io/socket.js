module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("Send Message", (data) => {
      console.log(`${socket.id} sent: ${data}`);
      io.emit("the message is passed", data); // broadcast
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
