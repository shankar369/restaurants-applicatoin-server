const mongoose = require("mongoose");

connectMongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("mongodb is connected");
};

module.exports = connectMongodb;