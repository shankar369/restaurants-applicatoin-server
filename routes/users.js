const express = require("express");
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/users");
const { protect, adminRoute } = require("../middleware/auth")


router.route("/").get(protect,adminRoute, getUsers);

// admin routes
router.route("/:user_id").put(protect, adminRoute, updateUser);
router.route("/:user_id").delete(protect, adminRoute, deleteUser);

module.exports = router;