import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string;
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});

export const jwtParse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer")) {
        res.status(401).json({ message: "UnAuthorized" });
        return;
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;

        const user = await User.findOne({ auth0Id });

        if (!user) {
            res.status(401).json({ message: "UnAuthorized" });
            return;
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
    } catch (error) {
        res.status(401).json({ message: "UnAuthorized" });
        return;
    }

};
