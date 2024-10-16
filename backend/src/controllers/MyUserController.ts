import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface CreateUserRequest extends Request {
    body: {
        auth0Id: string;
        email: String;
        name?: String;
        addressLine1?: String;
        city?: String;
        country?: String;
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

export default { createCurrentUser };