var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0
    },
    comment: {
        type: String
    },
    date: {
        type: String
    },
    name: {
        type: String
    },
    id: {
        type: Number
    }
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;