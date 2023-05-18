const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please provide an username"]
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
        select: false
    },
    admin: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    time : { type : Date, default: Date.now }
})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.admin, username: this.username}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };

const User = mongoose.model("User", UserSchema);

module.exports = User;