//====================
// REVIEW ROUTES
//====================

var express = require("express");
var router = express.Router({ mergeParams: true }); //will add all routes to the router rather than the app it self.
var Movie = require("../models/movie");
var Review = require("../models/review");

router.get("/new", isLoggedIn, function(req, res) {
    //find movie by id
    Movie.findById(req.params.id, function(err, movie) {
        if (err) {
            req.flash("error", "Error: Something went wrong!");
            console.log(err);
        } else {
            res.render("reviews/new", {
                movie: movie
            });
        }
    });
});

//CREATE ROUTE - For adding reviews
router.post("/", isLoggedIn, function(req, res, next) {
    //look up movie using id
    Movie.findById(req.params.id).populate("reviews").exec(function(err, movie) {
        if (err) {
            req.flash("error", "Error: Something went wrong!");
            res.redirect("/movies");
        } else {

            // CHANGE THIS TO REQ.BODY.REVIEW!!!
            Review.create(req.body.review, function(err, review) {
                if (err) {
                    req.flash("error", "Error: Something went wrong!");
                    console.log(err);
                } else {

                    //add username and id to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;

                    review.save(); //save the review

                    movie.reviews.push(review);
                    movie.save();
                    req.flash("success", "Successfully Created Comment");
                    res.redirect("/movies/" + req.params.id);
                }
            });
        }
    });
});


//EDIT ROUTE - for editing reviews **** NEEDS FIXING - DOES NOT WORK, so removed buttons from show page****
// router.get("/:review_id/edit", adminLoggedIn, function(req, res) {
//     Review.findById(req.params.review_id, function(err, foundReview) {
//         if (err) {
//              req.flash("error", "Error: Something went wrong!");
//             res.redirect("back");
//         } else {
//             res.render("reviews/edit", { movie_id: req.params.id, review: foundReview });
//         }
//     });
// });


//UPDATE ROUTE - For updating review **** NEEDS FIXING - DOES NOT WORK, so removed buttons from show page****
// router.put("/:review_id", adminLoggedIn, function(req, res) {
//     Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview) {
//         if (err) {
//              req.flash("error", "Error: Something went wrong!");
//              res.redirect("back");
//         } else {
//             console.log(updatedReview);
//              req.flash("success", "Review Updated!");
//             res.redirect("/movies/" + req.params.id);
//         }
//     });
// });


//DESTROY ROUTE - For deleting reveiws **** NEEDS FIXING - DOES NOT WORK, so removed buttons from show page****
// router.delete("/:review_id", adminLoggedIn, function(req, res) {
//     Review.findByIdAndRemove(req.params.review_id, function(err) {
//         if (err) {
//              req.flash("error", "Error: Something went wrong!");
//              console.log(err);
//              res.redirect("back");
//         } else {
//              req.flash("success", "Comment Removed");
//              res.redirect("/movies/" + req.params.id);
//         }
//     });
// });



//MIDDLEWARE - checks if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login to perform that action.");
    res.redirect("/movies/" + req.params.id);
}


//MIDDLEWARE - checks if user is logged in
function adminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username === "admin") {
            return next();
        }
    }
    req.flash("error", "You do not have permission to perform this action. Please login as 'admin'.");
    res.redirect("/movies/" + req.params.id);
}




module.exports = router;