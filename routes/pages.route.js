import express from "express";
import path from "path";
import UserController from "../controllers/user.controller.js";
import errorHandler from "../controllers/error.controller.js";
import Auth from "../auth/authorization.js";

const router = express.Router();

router.route("/").get(UserController.getAllUsers);

router.route('/css/index.css').get((req, res) => {
    res.sendFile(path.resolve() + "/css/index.css");
});

router.route("/css/style.css").get((req, res) => {
    res.sendFile(path.resolve() + "/css/style.css");
});

router.route("/css/recommend.css").get((req, res) => {
    res.sendFile(path.resolve() + "/css/recommend.css");
});

router.route("/login-page")
    .get(UserController.getLoginPage)
    .post(UserController.postLogin, errorHandler);

router.route("/sign-up")
    .get(UserController.getSignUpPage)
    .post(UserController.postSignUp, errorHandler);

router.route("/profile")
    .get(Auth.authorize, UserController.getProfile, errorHandler);

router.route("/logout")
    .get(UserController.getLogout);

router.route("/follow")
    .post(Auth.authorize, UserController.followUser, errorHandler);

router.route("/recommend")
    .get(Auth.authorize, UserController.getRecommended, errorHandler);

export default router;