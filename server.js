require("dotenv").config({path:"./config.env"})
const express = require("express")
const connectMongodb = require("./config/db");
const errorHandler = require("./middleware/error")
const cors = require("cors");


// mongodb connection
connectMongodb()

// creating express application
const app = express()
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"))
app.use("/api/restaurants",require("./routes/restaurants"));
app.use("/api/users",require("./routes/users"));
app.use("/api/ratings",require("./routes/ratings"));

// Error Handler should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

process.on("unhandledRejection", (err,promise) => {
    console.log(`Error : ${err}`);
    server.close(()=> process.exit(1));
})