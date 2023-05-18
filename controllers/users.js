const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse");


exports.getUsers = async (req,res,next) => {
    try{
        const data = await User.find().select("username email admin")
        res.status(200).json({
            success: true,data
        })
    }catch(error) {
        next(error);
    }
}


exports.updateUser = async (req,res,next) => {
    try{
        const {user_id} = req.params;
        const {username,email,admin} = req.body
        const user = await User.findById(user_id)
        user.username = username;
        user.email = email;
        user.admin = admin;
        await user.save();
        res.status(200).json({
            success: true,
            data: user
        })
    }catch(error) {
        next(error);
    }
}



exports.deleteUser = async (req,res,next) => {
    try{
        const {user_id} = req.params;
        await User.findOneAndDelete({_id:user_id})
        res.status(200).json({
            success: true,
            data: user_id
        })
    }catch(error) {
        next(error);
    }
}