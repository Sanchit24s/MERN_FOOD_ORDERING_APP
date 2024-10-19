import express from "express";
import multer from "multer";
import { createMyRestaurant, getMyRestaurant } from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

router.get("/", jwtCheck, jwtParse, (req, res) => {
    getMyRestaurant(req, res);
});

router.post("/", jwtCheck, jwtParse, upload.single("imageFile"), (req, res) => {
    createMyRestaurant(req, res);
});

export default router;
