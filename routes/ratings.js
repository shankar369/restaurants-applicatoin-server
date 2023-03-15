const express = require("express");
const router = express.Router();
const {getRestaurantRatings,postRestaurantRating, deleteRestaurantRating } = require("../controllers/ratings");
const { protect, adminRoute } = require("../middleware/auth")


router.route("/:restaurant_id").get(protect, getRestaurantRatings);

// admin routes
router.route("/:restaurant_id").post(protect, postRestaurantRating);
router.route("/:rating_id").delete(protect, adminRoute, deleteRestaurantRating);


module.exports = router;