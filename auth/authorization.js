import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export default class Auth {
    static authorize(req, res, next) {
        dotenv.config();
        if (req.cookies.token) {
            const payload = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
            if (payload) {
                next();
            } else {
                req.error = 403;
                next();
            }
        } else {
            req.error = 401;
            next();
        }
    }

    static getUserInfo(req) {
        dotenv.config();
        return jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
    }
}