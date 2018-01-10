var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


//Define the schema for a user
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fName: String,
    lName: String,
    email: String,
    visits: Number,
    purchases: [{
        name: String,
        price: String
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema); //Convert the schema into a model