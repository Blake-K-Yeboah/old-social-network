const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

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

    let github = req.body.github || null;
    let preview = req.body.preview || null;
    let randomId = uuidv4();
    let img;
    if (req.files) {
        const file = req.files.file;
        const newName = `${req.body.userId}-${randomId}.${file.name.split('.')[1]}`;
        img = newName;

        file.mv(`./client/public/uploads/projects/${newName}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Server Error. Try Again Later' });
            }
        });
    } else {
        return res.status(400).json({ error: 'You have to upload an image.' })
    }


    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        img,
        github,
        preview,
        postedBy: { name: req.body.usersName, id: req.body.userId }
    });

    newPost.save().then(post => res.json(post)).catch(err => console.log(err));

});
// Export Router
module.exports = router;