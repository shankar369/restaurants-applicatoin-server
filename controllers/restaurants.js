const Restaurant = require("../models/Restaurant")
const ErrorResponse = require("../utils/errorResponse");


exports.getRestaurants = async (req,res,next) => {
    try{
        const data = await Restaurant.find().sort([['avg_rating',-1]])
        res.status(200).json({
            success: true,data
        })
    }catch(error) {
        next(error);
    }
}

exports.postRestaurants = async (req,res,next) => {
    const {name, address, reservation_required} = req.body;
    if(!name || !address) {
        return next(new ErrorResponse("All fields are required",400))
    }
    console.log(name,address)
    try {
        const data = await Restaurant.create({
            name,address,reservation_required
        });
        res.status(201).json({success:true,data})
    } catch (error) {
        next(error);
    }
}

exports.getRestaurant = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        const data = await Restaurant.findById(restaurant_id)
        if(data === null){
            return next(new ErrorResponse("Restaurant not found",404))
        }
        res.status(200).json({
            success: true,data
        })
    }catch(error) {
        next(error);
    }
}

exports.updateRestaurant = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        const {name,address} = req.body
        const restaurant = await Restaurant.findById(restaurant_id)
        restaurant.name = name;
        restaurant.address = address;
        await restaurant.save();
        res.status(200).json({
            success: true,
            data: restaurant
        })
    }catch(error) {
        next(error);
    }
}

exports.updateRestaurantRating = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        const {avg_rating,top_rating,lowest_rating} = req.body
        const restaurant = await Restaurant.findById(restaurant_id)
        restaurant.avg_rating = avg_rating;
        restaurant.top_rating = top_rating;
        restaurant.lowest_rating = lowest_rating;
        await restaurant.save();
        res.status(200).json({
            success: true,
            data: restaurant
        })
    }catch(error) {
        next(error);
    }
}

exports.deleteRestaurant = async (req,res,next) => {
    try{
        const {restaurant_id} = req.params;
        await Restaurant.findOneAndDelete({_id:restaurant_id})
        res.status(200).json({
            success: true,
            data: restaurant_id
        })
    }catch(error) {
        next(error);
    }
}