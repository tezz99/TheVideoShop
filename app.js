var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    Movie = require("./models/movie"), //import movie model
    Review = require("./models/review"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash");

//Requring routes
var reviewRoutes = require("./routes/reviews"),
    movieRoutes = require("./routes/movies"),
    indexRoutes = require("./routes/index"),
    apiRoutes = require("./routes/api");


//App Configuration
// mongoose.connect("mongodb://localhost/video_shop_app"); //Connect to local database. Will create a new DB if one does not exist.
mongoose.connect("mongodb://tezz99:passw0rd01@ds249787.mlab.com:49787/thevideoshop"); // Connect to remote (mLab) database.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //Seed the database. - Clears the database (movies and reviews) and fills it with sample data.

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The quick brown fox jumps over the lazy dog", //Used to compute hash
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware that is run on every single route. It simply passes a user object to the ejs file being rendered.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.active_page = "";
    next();
});


//Setup routes
app.use(indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/reviews", reviewRoutes);
app.use("/api", apiRoutes);
app.use(redirectUnmatched); // redirect if nothing else sent a response

//Setup Error 404 redirect
function redirectUnmatched(req, res) {
    req.flash("error", "Error 404: The page you requested cannot be found");
    res.redirect("/movies");
}


//======================
// STRAT THE SERVER
//======================
app.listen(process.env.PORT || 3000, function() {
    console.log("The Video Shop Application Started on port 3000");
})