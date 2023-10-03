import User from '../models/user.js';
import UserAccessor from '../db_accessor/user.accessor.js';

export default class UserController {
    static async getAllUsers(req, res) {
        const users = await UserAccessor.getAllUsers();
        res.json(users);
    }
}