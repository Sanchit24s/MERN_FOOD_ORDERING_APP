import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/MyUserRoutes";

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log(`Connected to database!`));

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
