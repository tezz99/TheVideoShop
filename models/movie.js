var mongoose = require("mongoose");

//Define the schema for a movie
var movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    trailer: String,
    description: String,
    price: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

movieSchema.index({ title: 'text', description: 'text' })

module.exports = mongoose.model("Movie", movieSchema); //Convert the schema into a model