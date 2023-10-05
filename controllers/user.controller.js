import UserAccessor from '../db_accessor/user.accessor.js';

export default class UserController {
    static async getAllUsers(req, res) {
        const users = await UserAccessor.getAllUsers();
        console.log(users);
        res.render("index", { users: users } );
    }
}