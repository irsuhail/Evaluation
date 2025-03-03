const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const userCheck = require("../middleware/userCheck");

const router = express.Router();


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, '${req.body.username}${ext}');
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG are allowed"));
        }
    },
});


router.post("/register", upload.single("profileImage"), async (req, res) => {
    const { userId, username, email } = req.body;
    const profileImage = req.file ? req.file.path : null;

    try {
        const newUser = new User({ userId, username, email, profileImage });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});


router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


router.put("/update", userCheck, upload.single("profileImage"), async (req, res) => {
    try {
        if (req.file) {
            
            if (req.user.profileImage) {
                fs.unlinkSync(req.user.profileImage);
            }
            req.user.profileImage = req.file.path;
        }

        req.user.username = req.body.username || req.user.username;
        req.user.email = req.body.email || req.user.email;

        await req.user.save();
        res.json({ message: "Profile updated successfully", user: req.user });
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});


router.delete("/delete", userCheck, async (req, res) => {
    try {
        if (req.user.profileImage) {
            fs.unlinkSync(req.user.profileImage);
        }
        await User.deleteOne({ userId: req.user.userId });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Deletion failed" });
    }
});

module.exports = router;