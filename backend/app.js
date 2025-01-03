const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://basic-real-time-text-collaborator-with-320c.onrender.com",
    credentials: true,
  },
});

// Database Connection
const db = require("./config/db");
db();

// Routes
const userRouter = require("./routes/userRouter");
const documentRouter = require("./routes/documentRouter");
const documentModel = require("./models/document-model");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://basic-real-time-text-collaborator-with-320c.onrender.com",
    credentials: true,
  })
);

io.on("connection", function (socket) {
  console.log(`Connected ${socket.id}`);

  socket.on("join-document", async function ({ documentId, user }) {
    socket.join(documentId);
    console.log(
      `User with id ${socket.id} joined the room with id ${documentId}`
    );
    let document = await documentModel.findOne({ _id: documentId });
    if (document) {
      socket.emit("load-content", { documentId, content: document.content });
      document.sharedWith.push(user._id);
      await document.save();
    } else {
      let newDoc = await documentModel.create({ _id: documentId });
      socket.emit("load-content", newDoc.content);
    }
  });

  socket.on("leave-document", async function ({ id, user }) {
    socket.leave(id);
    let document = await documentModel.findOne({ _id: id });
    if (document) {
      document.sharedWith = document.sharedWith.filter(
        (id) => String(id) !== String(user?._id)
      ); 
      await document.save()
      console.log(`User with ${socket.id} left the document ${id}`);
    }
    
  });

  socket.on("send-changes", function ({ id, value }) {
    io.to(id).emit("receive-changes", value);
  });

  socket.on("disconnect", function () {
    console.log(`Disconnected ${socket.id}`);
  });
});

app.use("/api/users", userRouter);

app.use("/api/documents", documentRouter);

const port = process.env.PORT || 4000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
