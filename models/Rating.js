const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    rating : {
        type: Number,
        required: [true, "Please provide rating on scale of 5"]
    },
    comment: {
        type: String,
        required: [true, "Please provide a comment"]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user_name: {
        type: String
    },
    restaurant_id: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    time : { type : Date, default: Date.now }
})

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;