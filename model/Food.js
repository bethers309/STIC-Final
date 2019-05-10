var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    ingredients: {
        type: String
    },
    type: {
        type: String
    },
    name: {
        type: String 
    },
    picture: {
        type: String
    },
    price: {
        type: String
    },
    id: {
        type: Number
    }
});

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;