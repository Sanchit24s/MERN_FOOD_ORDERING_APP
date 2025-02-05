import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoutes from "./routes/MyUserRoutes";
import myRestaurantRoutes from "./routes/MyRestaurantRoutes";
import restaurantRoutes from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log(`Connected to database!`));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello!" });
});

app.use("/api/my/user", myUserRoutes);
app.use("/api/my/restaurant", myRestaurantRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
    console.log(`Server started on localhost:7000`);
});
