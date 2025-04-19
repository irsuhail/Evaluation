const express = require("express");
const { register, login, getAllUsers } = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, checkRole("admin"), getAllUsers);

module.exports = router;



