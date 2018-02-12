var express = require("express"),
	passport = require("passport")
var router = express.Router(); //will add all routes to the router rather than the app it self.
var Movie = require("../models/movie"),
	User = require("../models/user");

router.get('/movies', function(req, res, next) {
	var fields = req.query.fields || []
	fields = fields.split(',').join(' ')
	Movie.find({}, fields, function(err, movies) {
		if (err) return next(err)

		res.json(movies)
	})
});

router.get('/movies/:id', function(req, res, next) {
	Movie.find({_id: req.params.id}, function(err, movie) {
		if (err) return res.status(404).json({
			error: 'Movie ID not found'
		})

		res.json(movie)
	})
})

router.get('/reviews/:id', function(req, res, next) {
	Movie.findById(req.params.id).populate('reviews').exec(function(err, movie) {
		if (err) return res.status(404).json({
			error: 'Movie ID not found'
		})

		res.json(movie.reviews)
	})
})

router.get('/search', function(req, res, next) {
	Movie.find({ $text: { $search: req.query.q } }, function(err, movies) {
        if (err) return next(err)

        res.json(movies)
    })
})

//Handle login logic. Note the authentication middleware. 
router.post("/login", passport.authenticate("local", {
}), function(req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { $inc: { visits: 1 } }).exec()
    console.log(res.headersSent)
    res.status(200).end()
});

module.exports = router