const Message = require("../models/Message");
const User = require("../models/User");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      console.warn(data,"dataa");
      
      const { sender, receiver, content } = data;
      console.warn(sender,"senderr");
      console.warn(receiver,"receiverr");
      console.warn(content,"contentt");
      const message = await Message.create({ sender, receiver, content });
      io.to(receiver).emit("receiveMessage", message);
    });

    socket.on("join", async(userId) => {
      console.warn(userId,"userIdd");
      
      const userDetails = await User.findById(userId);
      console.warn(userDetails.username,"joined in socket");  
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
    