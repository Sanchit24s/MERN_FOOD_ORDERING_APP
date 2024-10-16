import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface CreateUserRequest extends Request {
    body: {
        auth0Id: string;
        // add other expected properties here
    };
}

export const createCurrentUser = async (
    req: CreateUserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({ newUser });
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Error creating user" });
    }
};