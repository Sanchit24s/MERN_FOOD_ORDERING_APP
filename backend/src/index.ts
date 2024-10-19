import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoutes from "./routes/MyUserRoutes";

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log(`Connected to database!`));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello!" });
});

app.use("/api/my/user", myUserRoutes);

app.listen(7000, () => {
    console.log(`Server started on localhost:7000`);
});
