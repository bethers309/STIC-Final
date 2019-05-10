var mongoose = require('mongoose');

var bbtSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    toppings: {
        type: [String]
    },
    ice: {
        type: Number,
        min: 0,
        max: 100
    },
    sugar: {
        type: Number,
        min: 0,
        max: 100
    },
    flavor: {
        type: String
    },
    id: {
        type: Number
    }
});

var BBT = mongoose.model('BBT', bbtSchema);
module.exports = BBT;