import express from "express";
import { createCurrentUser } from "../controllers/MyUserController";
import { jwtCheck } from "../middlewares/auth";

const router = express.Router();

router.post("/create", jwtCheck, (req, res, next) => {
    createCurrentUser(req, res, next);
});

export default router;