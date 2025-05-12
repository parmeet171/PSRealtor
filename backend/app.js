import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import { propertyRouter } from "./routes/property.route.js";
import { likedPropertyRouter } from "./routes/likedProperty.route.js";
import { messageRouter } from "./routes/message.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { adminRouter } from "./routes/admin.route.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", "https://magnificent-seahorse-af5365.netlify.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connection initialized");
  // events listen and emit

  socket.on("setup", (user) => {
    if (!user) {
      console.log("Invaid user trying to join room");
      return null;
    }
    socket.join(user?._id);
    console.log("user joined name = ", user?.name, " id = ", user?._id);
  });
  socket.on("newMessage", (message) => {
    console.log("message new => ", message);
    socket.to(message?.receiver).emit("messageReceived", message);
  });

  socket.on("newNotification", (message) => {
    console.log("server received notification");

    socket.to(message?.receiver).emit("notifcation");
  });
  // .......
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://magnificent-seahorse-af5365.netlify.app"],
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/liked/property", likedPropertyRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/admin", adminRouter);

export { server };
