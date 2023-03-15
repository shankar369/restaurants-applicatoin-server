const express = require("express");
const router = express.Router();
const { getRestaurants, postRestaurants, getRestaurant, updateRestaurant, deleteRestaurant,updateRestaurantRating } = require("../controllers/restaurants");
const { protect, adminRoute } = require("../middleware/auth")


router.route("/").get(protect, getRestaurants);
router.route("/:restaurant_id").get(protect, getRestaurant);

// admin routes
router.route("/").post(protect, adminRoute, postRestaurants);
router.route("/:restaurant_id").put(protect, adminRoute, updateRestaurant);
router.route("/:restaurant_id").delete(protect, adminRoute, deleteRestaurant);

module.exports = router;