const express = require("express");
const { createNotifications, getNotifications, deleteNotifications } = require("../controllers/notification");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
router.route("/create/notifications").post(isAuthenticated,createNotifications);
router.route("/get/notifications").get(isAuthenticated,getNotifications);
router.route("/delete/notifications").delete(isAuthenticated,deleteNotifications);
module.exports = router;
