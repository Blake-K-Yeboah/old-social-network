const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

// Load Post Validation
const validateInput = require('../../validation/post');

// Load Post Model
const Post = require('../../models/post.model');

// Default Route
router.get("/:id?", (req, res) => {

    // If There isnt an id return all users
    if (!req.params.id) {
        Post.find({}).then(posts => {
            res.json(posts);
        });
    } else {
        // Return Specific User Id
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

    // Define Github
    let github = req.body.github || null;

    // Define Preview
    let preview = req.body.preview || null;

    // Generate Random Id 
    let randomId = uuidv4();

    // Define Image
    let img;

    // Check if there is an uploaded file
    if (req.files) {

        // Define Uploaded File
        const file = req.files.file;

        // Define New Name for file
        const newName = `${req.body.userId}-${randomId}.${file.name.split('.')[1]}`;

        // Set Image (defined above)
        img = newName;

        // Upload File
        file.mv(`./client/public/uploads/projects/${newName}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Server Error. Try Again Later' });
            }
        });
    } else {

        // Return Error if no image was uploaded
        return res.status(400).json({ error: 'You have to upload an image.' })
    }

    // Define New Post Model; 
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        img,
        github,
        preview,
        postedBy: { name: req.body.usersName, id: req.body.userId }
    });

    // Save Post to Database
    newPost.save().then(post => res.json(post)).catch(err => console.log(err));

});
// Export Router
module.exports = router;