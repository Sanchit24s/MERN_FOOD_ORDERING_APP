import express from "express";
import multer from "multer";
import {
    createMyRestaurant,
    getMyRestaurant,
    getMyRestaurantOrders,
    updateMyRestaurant,
    updateOrderStatus,
} from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

router.get("/order", jwtCheck, jwtParse, getMyRestaurantOrders);

router.patch("/order/:orderId/status", jwtCheck, jwtParse, updateOrderStatus);

router.get("/", jwtCheck, jwtParse, (req, res) => {
    getMyRestaurant(req, res);
});

router.post("/", jwtCheck, jwtParse, upload.single("imageFile"), (req, res) => {
    createMyRestaurant(req, res);
});

router.put("/", jwtCheck, jwtParse, upload.single("imageFile"), (req, res) => {
    updateMyRestaurant(req, res);
});

export default router;
