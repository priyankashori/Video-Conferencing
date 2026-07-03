import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/usersRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
dotenv.config();

app.set("port", (process.env.PORT || 7000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working");
});

const start = async () => {
    app.set("mongo_user", process.env.MONGO_URL);
    const connectionDb = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log(`LISTENING ON PORT ${app.get("port")}`)
    });



}



start();