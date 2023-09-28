import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve() + "/index.html");
});

router.get("/page2", (req, res) => {
    res.sendFile(path.resolve() + "/page2.html")
});

export default router