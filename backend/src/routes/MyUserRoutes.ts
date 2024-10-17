import express from "express";
import { createCurrentUser, updateCurrentUser } from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const router = express.Router();

router.post("/create", jwtCheck, (req, res, next) => {
    createCurrentUser(req, res, next);
});

router.put("/update", jwtCheck, jwtParse, (req, res, next) => {
    updateCurrentUser(req, res, next);
});

export default router;