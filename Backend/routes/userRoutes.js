const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({email})

        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password });
        await user.save();

        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ 
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                 });
            }
        );
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Server error" );
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
       let user = await User.findOne({ email });

       if (!user) return res.status(400).json({ message: "Invalid credentials" });

       const isMatch = await user.matchPassword(password);
       if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                 });
            }
        );
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Server error");
    }
});

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;