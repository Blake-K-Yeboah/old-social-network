const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: false,
        default: null
    },
    preview: {
        type: String,
        required: false,
        default: null
    },
    imgPath: {
        type: String,
        required: false,
        default: 'default.jpg'
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        required: false,
        default: []
    },
    dislikes: {
        type: Array,
        required: false,
        default: []
    },
    tags: {
        type: Array,
        required: false,
        default: []
    },
    postedBy: {
        type: String,
        required: true
    }
});

module.exports = Post = mongoose.model('posts', PostSchema);