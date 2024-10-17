import express from "express";
import { createCurrentUser, getCurrentUser, updateCurrentUser } from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, (req, res, next) => {
    getCurrentUser(req, res, next);
});

router.post("/create", jwtCheck, (req, res, next) => {
    createCurrentUser(req, res, next);
});

router.put("/update", jwtCheck, jwtParse, (req, res, next) => {
    updateCurrentUser(req, res, next);
});

export default router;