import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || "http://localhost:3000";
const io = new Server(2132, {
  cors: {
    origin: FRONTEND_URL,
  },
});

let users = [];
const addUser = (userData, socketId) => {
  !users.some((user) => user.sub == userData.sub) &&
    users.push({ ...userData, socketId });
};

const getUser=(userId)=>{
    return users.find(user=>user.sub===userId)
}
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers",users)
  });

  socket.on('sendMessage', data => {
  const user = getUser(data.receiverId);
  if (user && user.socketId) {
    io.to(user.socketId).emit('getMessage', data);
  } else {
    console.log("Receiver not connected:", data.receiverId);
  }
});



  
});
