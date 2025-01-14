const express = require("express");
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controller/menuController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(authMiddleware, getMenu).post(authMiddleware, createMenu);
router
  .route("/:id")
  .put(authMiddleware, updateMenu)
  .delete(authMiddleware, deleteMenu);

module.exports = router;
