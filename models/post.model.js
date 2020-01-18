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
    img: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    tags: {
        type: String,
        default: ''
    },
    postedBy: {
        type: Object,
        required: true
    }
});

// Export Post Model
module.exports = Post = mongoose.model('posts', PostSchema);