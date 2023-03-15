const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please provide an name of restaurant"]
    },
    address: {
        type: String,
        required: [true, "please provide address of restaurant"],
    },
    reservation_required: {
        type: Number,
        default: 0
    },
    avg_rating: {
        type: Number,
        default: 0
    },
    top_rating : {
        type: Number,
        default: -1
    },
    lowest_rating: {
        type: Number,
        default: -1
    },
    total_ratings : {
        type: Number,
        default:0
    },
    date : { type : Date, default: Date.now }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;