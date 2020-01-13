const express = require('express');
const router = express.Router();

// Load Post Validation
const validateInput = require('../../validation/post');

// Load Post Model
const Post = require('../../models/post.model');

// Default Route
router.get("/:id?", (req, res) => {
    if (!req.params.id) {
        Post.find({}).then(posts => {
            res.json(posts);
        });
    } else {
        Post.findById(req.params.id).then(post => {
            if (!post) {
                return res.status(400).json({ error: 'No Post with that id' });
            } else {
                res.json(post);
            }
        })
    }
});

// Add a post
router.post('/', (req, res) => {

    // Form validation
    const { errors, isValid } = validateInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let github = req.body.github ? req.body.github : null;
    let preview = req.body.preview ? req.body.preview : null;
    let imgPath = req.body.filePath ? req.body.filePath : 'default.jpg';

    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        imgPath,
        github,
        preview,
        postedBy: req.body.id
    });

    newPost.save().then(post => res.json(post)).catch(err => console.log(err));

});
// Export Router
module.exports = router;