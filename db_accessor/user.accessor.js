import Connection from "../db/connection.js";
import User from "../models/user.js";

export default class UserAccessor {
    static async getAllUsers() {
        try {
            await Connection.open("Network-Website");
            const users = [];
            for await (const doc of User.find()) {
                users.push(doc);
            }
            return users;
        } catch(e) {
            throw e;
        }
    }

    static async createUser(userDoc) {
        try {
            await Connection.open("Network-Website");
            const user = await User.create(userDoc);
            return user;
        } catch (e) {
            throw e;
        }
    }
}