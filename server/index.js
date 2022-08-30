const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const authRoutes = require("./routes/urserRoute.js");
const messageRoutes = require("./routes/messageRoute");
const fileRoutes = require("./routes/fileRoute")
const socket = require("socket.io");

require("dotenv").config();

const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/file', fileRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected to db")
    }
})
    

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on Port ${process.env.PORT}`)
})


const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});