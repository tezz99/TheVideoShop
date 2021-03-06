//======================
// MOVIES ROUTES
//======================

var express = require("express");
var router = express.Router(); //will add all routes to the router rather than the app it self.
var Movie = require("../models/movie");


//Route for viewing movies
router.get("/", function(req, res) {

    //For ajax loading
    if (req.xhr) {
        var offset = (req.query.offset || 0) * 6
        Movie.find({}).skip(offset).limit(6).exec(function(err, movies) {
            if (err) {
                console.log(err);
            } else {
                if (!movies.length) {
                    res.status(404)
                    res.end()
                } else {
                    res.render("movies/row", {
                        movies: movies,
                        active_page: "home"
                    })
                }

            }
        })
    } else {
        Movie.find({}).limit(6).exec(function(err, movies) {
            if (err) {
                console.log(err);
            } else {
                res.render("movies/index", {
                    movies: movies,
                    active_page: "home"
                });
            }
        });
    }
});


//Route for adding new movies 
router.get("/new", adminLoggedIn, function(req, res) {
    res.redirect("/admin");
});


//CREATE Route (POST) for adding new movie 
router.post("/", adminLoggedIn, function(req, res) {
    //Create the movie
    Movie.create(req.body.movie, function(err, newMovie) {
        if (err) {
            req.flash("error", "Error adding movie.");
            res.render("new");
        } else {
            req.flash("success", "Movie Added - " + newMovie.title);
            res.redirect("/admin");
        }
    });
});


//SHOW ROUTE - for showing movie information page
router.get("/:id", function(req, res) {

    //Finds movie by and populates it with reviews before passing it for render
    Movie.findById(req.params.id).populate("reviews").exec(function(err, foundMovie) {
        if (err) {
            req.flash("error", "Error: Movie Not Found!");
            res.redirect("/movies"); //*** Show movie not found message later.
        } else {
            res.render("movies/show", {
                movie: foundMovie,
            });
        }
    });
});


//EDIT ROUTE - for editing movie information. Middleware checks if admin is logged in or not.
router.get("/:id/edit", adminLoggedIn, function(req, res) {

    Movie.findById(req.params.id, function(err, foundMovie) {
        if (err) {
            req.flash("error", "Error: Movie Not Found!");
            res.redirect("back")
        } else {
            res.render("movies/edit", {
                movie: foundMovie
            });
        }
    });
});


//UPDATE ROUTE - For updating movie information. Middleware checks if admin is logged in or not.
router.put("/:id", adminLoggedIn, function(req, res) {
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie) {
        if (err) {
            req.flash("error", "Error: Movie Not Found!");
            res.redirect("/movies");
        } else {
            req.flash("success", "Updated Movie Page");
            res.redirect("/movies/" + updatedMovie._id);
        }
    });
});


//DELETE ROUTE - For deleting movies. Middleware checks if admin is logged in or not.
router.delete("/:id", adminLoggedIn, function(req, res) {
    //Destory/delete the movie from the database
    Movie.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", "Error: Movie Not Found!");
            res.redirect("/movies");
        } else {
            req.flash("success", "Successfully removed Movie!");
            res.redirect("/movies");
        }
    });
});



//MIDDLEWARE - checks if user is logged in
function adminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username === "admin") {
            return next();
        }
    }
    req.flash("error", "You do not have permission to perform this action. Please login as 'admin'.");
    res.redirect("/movies");
}

module.exports = router;