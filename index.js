import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const port = process.env.PORT || 8802;


connectDB();

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));
app.get('*', (req,res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));

app.get("/", (req, res) => {
    res.send("health ok !!!")
})

// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:error.stack
    })
})


app.listen(port, () => {
    console.log(`running on port ${port}`);
})