const Rating = require("../models/Rating")
const ErrorResponse = require("../utils/errorResponse");
const Restaurant = require("../models/Restaurant")


exports.getRestaurantRatings = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        const data = await Rating.find({restaurant_id}).sort({time: 1})
        res.status(200).json({
            success: true,
            data
        })
    }catch(error) {
        next(error);
    }
}

exports.postRestaurantRating = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        let {rating,comment,user_id, user_name} = req.body;
        rating = parseInt(rating);
        const restaurant = await Restaurant.findById(restaurant_id)
        if(restaurant.top_rating === -1) restaurant.top_rating = rating;
        if(restaurant.lowest_rating === -1) restaurant.lowest_rating = rating;
        if(restaurant.top_rating < rating) restaurant.top_rating = rating;
        if(restaurant.lowest_rating > rating) restaurant.lowest_rating = rating;
        if(restaurant.total_ratings === 0){ restaurant.avg_rating = rating }
        else { restaurant.avg_rating = (parseFloat(restaurant.avg_rating) + rating) / 2 }
        restaurant.total_ratings = restaurant.total_ratings + 1
        await restaurant.save();
        const data = await Rating.create({rating,comment,restaurant_id,user_id,user_name})
        res.status(200).json({
            success: true,
            data
        })
    }catch(error) {
        next(error);
    }
}

exports.deleteRestaurantRating = async (req,res,next) => {
    try{
        const {rating_id} = req.params;
        await Rating.findOneAndDelete({_id:rating_id})
        res.status(200).json({
            success: true,
            data: rating_id
        })
    }catch(error) {
        next(error);
    }
}
