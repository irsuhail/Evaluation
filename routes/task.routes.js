const express = require("express");
const {
  createTask, getTasks, updateTaskStatus,
  assignTask, deleteTask, groupByUser, groupByStatus,
} = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role.middleware");
const rateLimiter = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, rateLimiter, getTasks);
router.patch("/:id/complete", auth, updateTaskStatus);
router.patch("/:id/assign", auth, assignTask);
router.delete("/:id", auth, deleteTask);

router.get("/grouped/by-user", auth, checkRole("admin"), groupByUser);
router.get("/grouped/by-completion", auth, checkRole("admin"), groupByStatus);

module.exports = router;