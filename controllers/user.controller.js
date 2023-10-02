import { config as dotenvConfig } from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';

export default class UserController {
    static async getAllUsers(req, res) {
        dotenvConfig();

        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;
        const DATABASE_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.xtdufxk.mongodb.net/?retryWrites=true&w=majority`;

        mongoose.connect(
            DATABASE_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 50,
                socketTimeoutMS: 2500
            }
        );

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