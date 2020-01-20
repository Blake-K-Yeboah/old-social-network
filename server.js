const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const fileUpload = require('express-fileupload');

// Impoort Routes
const users = require("./routes/api/users.routes");
const posts = require("./routes/api/posts.routes");

// Initialize Express
const app = express();

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "/client/build")));

/*React root*/
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// File Upload Middleware
app.use(fileUpload());

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

// process.env.PORT is herokus port else 5000
const port = process.env.PORT || 5000;

// Listen On Port
app.listen(port, () => console.log(`Server up and running on port ${port} !`));