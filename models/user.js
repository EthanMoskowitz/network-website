import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    bio: {type: String, required: false},
    followers: [{type: String}],
    following: [{type: String}]
}, {
    collection: 'Users'
});

const db = mongoose.connection.useDb("Network-Website");
const User = db.model("User", UserSchema);

export default User;