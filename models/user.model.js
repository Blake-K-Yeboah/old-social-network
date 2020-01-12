const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    profileIcon: {
        type: String,
        default: 'default.jpg'
    },
    headerImg: {
        type: String,
        default: 'default.jpg'
    },
    preferredTheme: {
        type: String,
        default: 'light'
    },
    messageGroups: {
        type: Array,
        default: []
    },
    github: {
        type: String,
        required: false
    },
    portfolio: {
        type: String,
        required: false
    }
});

// Export Model
module.exports = User = mongoose.model("users", UserSchema);