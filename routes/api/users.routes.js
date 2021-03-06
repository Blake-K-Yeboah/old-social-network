const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user.model");

// Default Users Route
router.get("/:id?", (req, res) => {

    // If There is an id return specific user
    if (req.params.id) {

        // Return individual user
        User.findById(req.params.id).then(user => {
            if (!user) {
                return res.status(400).json({ error: "No User With That Id" });
            } else {
                return res.json(user);
            }
        })

    } else {

        // Return all users
        User.find({}).then(users => {
            res.json(users);
        })
    }
});

// Register Route
router.post("/register", (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        // Check If a user with that email exists
        if (user) {
            return res.status(400).json({ error: 'true', email: "Email already exists" });
        } else {
            // Create A new User Model
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// Login Route
router.post("/login", (req, res) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {

        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched

                // Create JWT Payload
                const payload = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    bio: user.bio,
                    email: user.email,
                    createdOn: user.createdON,
                    profileIcon: user.profileIcon,
                    headerImg: user.headerImg,
                    preferredTheme: user.preferredTheme,
                    messageGroups: user.messageGroups,
                    github: user.github,
                    portfolio: user.portfolio
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// Update Route
router.put('/:id', (req, res) => {

    // Update User In Database
    User.findByIdAndUpdate(req.params.id, req.body, { upsert: true }, (err, doc) => {
        if (err) return res.send(500, { msg: err });
        return res.send('Updated User!');
    });

});

// Upload Profile Picture ROute
router.post('/:id/profilepic', (req, res) => {

    // If There isnt an image return status 400
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Define Specific File
    const file = req.files.file;

    // Define New Name For File
    const newName = `${req.params.id}.${file.name.split('.')[1]}`;

    // Upload File to uploads folder
    file.mv(`./client/public/uploads/profile/${newName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            // Update User in database
            User.findByIdAndUpdate(req.params.id, { profileIcon: newName }, { upsert: true }, (err, doc) => {
                if (err) return res.send(500, { msg: err });
                return res.send('Added Profile Picture');
            })
        }

    });
});

// Upload Header Img Route
router.post('/:id/header', (req, res) => {

    // If There isnt an image return status 400
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Define Specific FIle
    const file = req.files.file;

    // Define New Name
    const newName = `${req.params.id}.${file.name.split('.')[1]}`;

    // Upload FIle to uploads folder
    file.mv(`./client/public/uploads/header/${newName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {

            // Update User in Database
            User.findByIdAndUpdate(req.params.id, { headerImg: newName }, { upsert: true }, (err, doc) => {
                if (err) return res.send(500, { msg: err });
                return res.send('Added Header Image');
            })
        }
    });
});

module.exports = router;