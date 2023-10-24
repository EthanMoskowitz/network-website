import UserAccessor from '../db_accessor/user.accessor.js';
import bcrypt from 'bcryptjs';

export default class UserController {
    static async getAllUsers(req, res) {
        const users = await UserAccessor.getAllUsers();
        console.log(users);
        res.render("index", { users: users } );
    }

    static getLoginPage(req, res) {
        console.log(req.cookies.error);
        res.render("login_page", { error: req.cookies.error });
    }

    static getSignUpPage(req, res) {
        res.render("sign_up");
    }

    static async postSignUp(req, res, next) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await UserAccessor.createUser(req.body);
            res.redirect("/login-page");
        } catch (e) {
            res.redirect("/");
        }
    }
}