var express = require("express"),
	passport = require("passport")
var router = express.Router(); //will add all routes to the router rather than the app it self.
var Movie = require("../models/movie"),
	User = require("../models/user");

router.get('/movies', function(req, res, next) {
	var fields = req.query.fields || ''
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

router.post('/movies/:id/buy', requireAuth, function(req, res, next) {
	Movie.findById(req.params.id, function(err, movie) {
		if (err) {
			return res.status(404).json({
				error: 'Movie ID not found'
			})
		}

		var purchase = {
			name: movie.title,
			price: movie.price
		}

		//Find user that is purchasing the movie.
		User.findById(req.user._id, function(err, user) {
			if (err) {
				return next (err);
			}

			user.purchases.push(purchase)
			user.save();
			res.status(200).end()
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
router.post("/users/login", passport.authenticate("local", {
}), function(req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { $inc: { visits: 1 } }).exec()
    res.status(200).end()
});

router.post("/users/register", function(req, res, next) {
	var newUser = new User({ username: req.body.username, email: req.body.email, fName: req.body.fName, lName: req.body.lName });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) return res.status(400).json({
        	error: err.message
        })

        passport.authenticate("local")(req, res, function() {
            res.status(200).end()
        });
    });
})

router.get("/users/me", requireAuth, function(req, res, next) {
	res.json(req.user)
})

function requireAuth(req, res, next) {
	if (req.isAuthenticated()) return next()
	res.status(403).json({
		error: 'You are not logged in'
	})
}

module.exports = router