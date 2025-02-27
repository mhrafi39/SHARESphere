import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import crypto from "crypto";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // For password hashing

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailOrPhone: String,
    password: String,
    birthday: Date,
    gender: String,
    nidPassport: Buffer, // Store file as buffer
    otp: String,
    otpExpires: Date,
    verified: Boolean,
    profilePic: String, // URL for profile picture
    bio: String, // User bio
    rating: Number, // User rating
    communities: [String], // List of communities
});

const User = mongoose.model("User", UserSchema);

// Post Schema
const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    time: String,
    title: String,
    content: String,
    type: String,
    category: String,
    image: String,
});

const Post = mongoose.model("Post", PostSchema);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Hash Password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Register User and Send OTP
app.post("/register", upload.single("nidPassport"), async (req, res) => {
    const { firstName, lastName, emailOrPhone, password, birthday, gender } = req.body;
    if (!firstName || !lastName || !emailOrPhone || !password || !birthday || !gender || !req.file) {
        return res.status(400).json({ message: "All fields including NID/Passport image are required" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

    const hashedPassword = await hashPassword(password);

    const newUser = await User.findOneAndUpdate(
        { emailOrPhone },
        { firstName, lastName, password: hashedPassword, birthday, gender, nidPassport: req.file.buffer, otp, otpExpires, verified: false },
        { upsert: true, new: true }
    );

    const mailOptions = {
        from: `"SHARESphere" <${process.env.EMAIL_USER}>`,
        to: emailOrPhone,
        subject: "🔐 Your OTP Code for SHARESphere",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="text-align: center; color: #333;">🔒 Your OTP Code</h2>
                <p style="font-size: 16px; color: #555;">
                    Hello, <br><br>
                    Thank you for registering on <b>SHARESphere</b>. To verify your account, please use the OTP code below:
                </p>
                <div style="text-align: center; padding: 15px; background-color: #fff; border-radius: 5px; font-size: 22px; font-weight: bold; color: #333; border: 2px dashed #4CAF50;">
                    ${otp}
                </div>
                <p style="font-size: 16px; color: #555;">
                    This OTP will expire in <b>10 minutes</b>. Please do not share this code with anyone.
                </p>
                <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
                <p style="text-align: center; font-size: 14px; color: #777;">
                    If you didn't request this, please ignore this email.<br>
                    Need help? Contact our support team at <a href="mailto:support@sharesphere.com" style="color: #4CAF50;">support@sharesphere.com</a>
                </p>
            </div>
        `,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ message: "Failed to send OTP" });
        res.json({ message: "OTP sent successfully", userId: newUser._id });
    });
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
    const { emailOrPhone, otp } = req.body;
    const user = await User.findOne({ emailOrPhone });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "✅ OTP verified successfully!" });
});

// Login User
app.post("/login", async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const user = await User.findOne({ emailOrPhone });

        if (!user) return res.status(400).json({ message: "User not found" });

        if (!user.verified) return res.status(400).json({ message: "Account not verified. Please verify OTP." });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, message: "Login successful!", user: { id: user._id, firstName: user.firstName, lastName: user.lastName, emailOrPhone: user.emailOrPhone } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};


// Get User Profile



app.get("/profile/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Fetch the user from the database (excluding sensitive fields)
        const user = await User.findById(id).select("-password -otp -otpExpires");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch the posts associated with the user
        const posts = await Post.find({ author: user._id }).populate("author", "firstName lastName profilePic");

        // Return the user and posts
        res.json({ user, posts });
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});






// Create a Post
app.post("/posts", authenticateUser, upload.single("image"), async (req, res) => {
    const { title, content, type, category } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newPost = new Post({
            author: user._id,
            time: new Date().toISOString(),
            title,
            content,
            type,
            category,
            image: req.file ? req.file.buffer.toString("base64") : null, // Store image as Base64
        });

        await newPost.save();
        res.status(201).json({ message: "✅ Post created successfully!", post: newPost });
    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ message: "❌ Server error, please try again later." });
    }
});





// Get All Posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "firstName lastName profilePic");
        res.json(posts);
    } catch (error) {
        console.error("Posts fetch error:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// Get Single Post
app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstName lastName profilePic");
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (error) {
        console.error("Post fetch error:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));