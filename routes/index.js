var express = require("express");
var router = express.Router(); //will add all routes to the router rather than the app it self.
var passport = require("passport");
var User = require("../models/user");
var http = require("http");
var Movie = require("../models/movie");


//======================
// ALL OTHER ROUTES
//======================

//Root Route
router.get("/", function(req, res) {
    res.redirect("/movies");
});


//====================
// AUTH ROUTES
//====================
//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username, email: req.body.email, fName: req.body.fName, lName: req.body.lName });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/movies");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Successfully Registered and Logged In");
            res.redirect("/movies");
        });
    });
});


//show login form
router.get("/login", function(req, res) {
    req.flash("error", "Please Login using the link in the navbar.");
    res.redirect("/movies");
});

//Handle login logic. Note the authentication middleware. 
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/movies",
    failureFlash: "Login Failed - Please check username or password",
    successFlash: "Successfully Logged In"
}), function(req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { $inc: { visits: 1 } }).exec()
    res.redirect('back')
});


//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged Off Successfully")
    res.redirect("/movies")
});


//====================
// ADMIN PANEL ROUTES
//====================
// ADMIN PANEL ROUTE
router.get("/admin", adminLoggedIn, function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/panel", {
                users: users
            });
        }
    });
});




//====================
// USERS ROUTES
//====================

//SHOW ROUTE - Display my account //FIXME: add middleware?
router.get("/users/:user_id", isLoggedIn, function(req, res) {
    res.render("users/show", {
        sessionID: req.sessionID
    });
});


//EDIT ROUTE - Display edit page for editing user
router.get("/users/:user_id/edit", isLoggedIn, function(req, res) {

    //if admin is logged in, then pass user to ejs. Admin can edit anyone.
    if (isAdminLoggedIn(req)) {
        User.findById(req.params.user_id, function(err, foundUser) {
            if (err) {
                req.flash("error", "Error: The User you are trying to edit does not exist");
                res.redirect("back")
            } else {
                res.render("users/edit", {
                    user: foundUser
                });
            }
        });
    } else {
        res.render("users/edit", { user: null }); //If not admin, user can only see their edit page.
    }
});


//Delete User Route
router.delete("/users/:user_id", adminLoggedIn, function(req, res) {

    //FIXME: find user by id to get username and then remove all reviews that match username.

    //Destory/delete the user from the database
    User.findByIdAndRemove(req.params.user_id, function(err) {
        if (err) {
            req.flash("error", "Error: The User you are trying to delete does not exist");
            res.redirect("/admin");
        } else {
            req.flash("success", "Successfully Deleted User");
            res.redirect("/admin");
        }
    });
});


//Update User Details Route
router.put("/users/:user_id", isLoggedIn, function(req, res) {
    User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser) {
        if (err) {
            req.flash("error", "Error: The User you are trying to edit does not exist");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully Updated User Details");
            //FIXME: admin panel edits get redirected to myaccount page as well.
            res.redirect("/users/" + req.params.user_id);
        }
    });
});


//Add purchase to user list
router.put("/purchase/:movie_id/:user_id", function(req, res) {

    //Redirect if not logged in.
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login to purchase a movie");
        return res.redirect("/movies/" + req.params.movie_id);
    }

    //Find movie to be purchased
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err) {
            req.flash("error", "Error: The movie you are trying to purchase does not exist!");
            res.redirect("/movies");
        } else {

            //Get purchse info
            var purchase = {
                name: movie.title,
                price: movie.price
            };

            //Find user purchasing movie
            User.findById(req.params.user_id, function(err, user) {

                if (err) {
                    req.flash("error", "Error: User does not exist");
                    res.redirect("/movies/" + req.params.movie_id);
                }

                user.purchases.push(purchase);
                user.save();
                req.flash("success", "Successfully Purchased " + movie.title + ". Visit Your Account to view your purchase history.");
                res.redirect("/movies/" + req.params.movie_id);
            })
        }
    });
});


//About Us route
router.get("/about", function(req, res) {
    res.render("about", {
        active_page: 'about'
    });
});

//Contact Us route
router.get("/contact", function(req, res) {
    res.render("contact", {
        active_page: 'contact'
    });
});

//Privacy route
router.get("/privacy", function(req, res) {
    res.render("privacy", {
        active_page: 'privacy'
    });
});




//=================
// SEARCH ROUTES
//=================
router.get("/search/:searchterm", function(req, res) {
    Movie.find({ $text: { $search: req.params.searchterm } }, function(err, movies) {
        if (err) {
            return console.log(err)
        }

        res.render("movies/search", {
            movies: movies,
            searchterm: req.params.searchterm,
        })
    })
});

router.get("/weather", function(req, res) {
    http.get('http://api.openweathermap.org/data/2.5/weather?q=Wellington,NZ&APPID=c7f1b5c998bca751cce9c227ead33df8', function(w) {
        w.pipe(res)
    })
})



//LAST ROUTE - 404 NOT FOUND
// router.use(function(req, res, next) {
//     req.flash("error", "Error 404: The page you are looking for does not exist.");
//     res.send("404");
// })


//=================
// MIDDLEWARES
//=================

//MIDDLEWARE - checks if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login to perform that action.");
    res.redirect("/movies");
}


//MIDDLEWARE - checks if user is logged in
function adminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username === "admin") {
            return next();
        }
    }
    req.flash("error", "You do not have permission to perform this action. Please login as 'admin'.");
    res.redirect("/movies"); //FIXME make it better looking
}


//Returns true if admin is logged in
function isAdminLoggedIn(req) {
    if (req.user.username === "admin") {
        return true;
    }
    return false;
}


module.exports = router;