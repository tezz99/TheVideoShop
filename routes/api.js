var express = require("express");
var router = express.Router(); //will add all routes to the router rather than the app it self.
var Movie = require("../models/movie");

router.get('/movies', function(req, res, next) {
	var fields = req.query.fields || []
	fields = fields.split(',').join(' ')
	Movie.find({}, fields, function(err, movies) {
		if (err) return next(err)

		res.json(movies)
	})
});



//I THINK YOU HAVE TO POPULATE REVIEWS FIRST...
//Movie.findById(req.params.id).populate("reviews").exec(function(err, foundMovie) {

router.get('/movies/:id', function(req, res, next) {
	Movie.find({_id: req.params.id}, function(err, movie) {
		if (err) return res.status(404).json({
			error: 'Movie ID not found'
		})

		res.json(movie)
	})
})

router.get('/reviews/:id', function(req, res, next) {

})

module.exports = router