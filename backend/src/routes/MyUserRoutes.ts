import express from "express";
import { createCurrentUser } from "../controllers/MyUserController";

const router = express.Router();

router.post("/create", (req, res, next) => {
    createCurrentUser(req, res, next);
});

export default router;