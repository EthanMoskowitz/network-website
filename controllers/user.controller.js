import User from '../models/user.js';
import Connection from '../db/connection.js';

export default class UserController {
    static async getAllUsers(req, res) {

        await Connection.open("users");
        const users = [];
        try {
            for await (const doc of User.find()) {
                users.push(doc);
            }
        } catch(e) {
            throw e;
        }

        res.json(users);
    }
}