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
    indexRoutes = require("./routes/index");


//App Configuration
mongoose.connect("mongodb://localhost/video_shop_app"); //Connect to database. Will create a new DB if one does not exist.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());

seedDB(); //Seed the database. - DONT USE.


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


app.use(indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/reviews", reviewRoutes);



//======================
// STRAT THE SERVER
//======================
app.listen(3000, function() {
    console.log("The Video Shop Application Started on port 3000");
})