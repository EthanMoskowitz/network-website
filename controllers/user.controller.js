import UserAccessor from '../db_accessor/user.accessor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../auth/authorization.js';

export default class UserController {
    static async getAllUsers(req, res) {
        const users = await UserAccessor.getAllUsers();
        var bool = false;
        if(req.cookies.token) {
            bool = true;
        }
        res.render("index", { users: users,
        login: bool, } );
    }

    static getLoginPage(req, res) {
        res.render("login_page", { error: req.cookies.error });
    }

    static getSignUpPage(req, res) {
        res.render("sign_up");
    }

    static async getProfile(req, res, next) {
        if (!req.error) {
            var user = Auth.getUserInfo(req);
            const username = user.username;
            user = await UserAccessor.getUser(username);
            res.render("profile", {
                name: user.username,
                email: user.email,
                bio: user.bio,
                followers: user.followers,
                following: user.following,
            });
        } else {
            return next();
        }
    }

    static getLogout(req, res) {
        res.clearCookie("token");
        res.redirect("/");
    }

    static async postSignUp(req, res, next) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await UserAccessor.createUser(req.body);
            res.redirect("/login-page");
        } catch (e) {
            req.error = 999;
            next();
        }
    }

    static async postLogin(req, res, next) {
        try {
            if (!req.cookies.token) {
                const user = await UserAccessor.getUser(req.body.username);
                if (user) {
                    const result = await bcrypt.compare(req.body.password, user.password);
                    if (result) {
                        const token = jwt.sign(
                            {
                                username: user.username,
                                email: user.email,
                                bio: user.bio,
                                followers: user.followers,
                                following: user.following,
                        },
                        process.env.TOKEN_KEY
                        );
                        res.cookie("token", token, {
                            httpOnly: true,
                            maxAge: 60 * 60 * 1000,
                        });
                        res.redirect("/profile");
                    } else {
                        req.error = 400;
                        next();
                    }
                } else {
                    req.error = 400;
                    next();
                }
            } else {
                res.redirect("/profile");
            }
        } catch(e) {
            req.error = 400;
            next();
        }
    }

    static async followUser(req, res, next) {
        if (!req.error) {
            const toFollow = req.body.follow;
            var user = Auth.getUserInfo(req);
            const username = user.username;
            user = await UserAccessor.getUser(username);
            const following = user.following;

            if (!following.includes(toFollow) && toFollow != username) {
                await UserAccessor.addFollower(username, toFollow);
            }
            res.redirect("/");
        } else {
            return next();
        }
    }
}