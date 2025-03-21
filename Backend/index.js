import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import crypto from "crypto";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailOrPhone: String,
  password: String,
  birthday: Date,
  gender: String,
  nidPassport: String, // Cloudinary URL
  otp: String,
  otpExpires: Date,
  verified: Boolean,
  adminVerified: Boolean,
  profilePic: String, // Cloudinary URL
  bio: String,
  rating: Number,
  communities: [String],
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  text: String,
  time: { type: Date, default: Date.now },
});

// Post Schema
const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: String,
  title: String,
  content: String,
  type: String,
  category: String,
  image: String, // Cloudinary URL
  comments: [CommentSchema], // Array of comments
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

// Utility Functions
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Upload to Cloudinary
const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(file.buffer);
  });
};

// Register User and Send OTP
app.post("/register", upload.single("nidPassport"), async (req, res) => {
  const { firstName, lastName, emailOrPhone, password, birthday, gender } = req.body;

  if (!firstName || !lastName || !emailOrPhone || !password || !birthday || !gender || !req.file) {
    return res.status(400).json({ message: "All fields including NID/Passport image are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ emailOrPhone });

    if (existingUser) {
      // If the user is already verified, prevent registration
      if (existingUser.verified) {
        return res.status(400).json({ message: "An account with this email or phone number already exists and is verified." });
      }

      // If the user exists but is not verified, allow re-registration (e.g., resend OTP)
      const nidPassportUrl = await uploadToCloudinary(req.file);
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity
      const hashedPassword = await hashPassword(password);

      // Update the existing user with new details
      await User.findOneAndUpdate(
        { emailOrPhone },
        {
          firstName,
          lastName,
          password: hashedPassword,
          birthday,
          gender,
          nidPassport: nidPassportUrl,
          otp,
          otpExpires,
          verified: false,
        }
      );

      // Send OTP via email
      await sendOTP(emailOrPhone, otp);

      return res.json({ message: "OTP sent successfully", userId: existingUser._id });
    }

    // If the user does not exist, proceed with registration
    const nidPassportUrl = await uploadToCloudinary(req.file);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      emailOrPhone,
      password: hashedPassword,
      birthday,
      gender,
      nidPassport: nidPassportUrl,
      otp,
      otpExpires,
      verified: false,
      adminVerified:false,
    });

    // Send OTP via email
    await sendOTP(emailOrPhone, otp);

    res.json({ message: "OTP sent successfully", userId: newUser._id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Reusable function to send OTP
const sendOTP = async (emailOrPhone, otp) => {
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

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

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

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if OTP is verified
    if (!user.verified) {
      return res.status(400).json({ message: "Account not verified. Please verify OTP." });
    }

    // Check if admin has verified the user
    if (!user.adminVerified) {
      return res.status(400).json({ message: "Your account is pending admin verification. Please wait for approval." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      message: "Login successful!",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailOrPhone: user.emailOrPhone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Middleware to authenticate user
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
app.get("/check-admin", async (req, res) => {
  try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json({ isAdmin: user.isAdmin });
  } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(401).json({ message: "Unauthorized" });
  }
});
app.get("/admin/all-users", async (req, res) => {
  try {
      const users = await User.find({}, { password: 0, otp: 0, otpExpires: 0 }); // Exclude sensitive fields
      res.json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
  }
});







app.post("/admin/approve-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { action } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user status
    user.adminVerified = action === "approve";
    await user.save();

    // Send email notification based on action
    const mailOptions = {
      from: `"SHARESphere Admin" <${process.env.EMAIL_USER}>`, // Sender address
      to: user.emailOrPhone, // User's email or phone (assuming emailOrPhone is an email)
      subject:
        action === "approve"
          ? "Your SHARESphere Account Has Been Approved"
          : "Your SHARESphere Account Has Been Rejected", // Email subject
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; padding: 20px; background-color: ${action === "approve" ? "#4CAF50" : "#f44336"}; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">
              ${action === "approve" ? "Account Approved!" : "Account Rejected"}
            </h2>
          </div>
          <div style="padding: 20px;">
            <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p>
              ${
                action === "approve"
                  ? "We are pleased to inform you that your SHARESphere account has been approved by the admin. You can now log in and start using all the features of SHARESphere."
                  : "We regret to inform you that your SHARESphere account has been rejected by the admin. If you believe this is a mistake, please contact us."
              }
            </p>
            <p>
              If you have any questions, feel free to contact us at
              <a href="mailto:support@sharesphere.com" style="color: #4CAF50; text-decoration: none;">
                support@sharesphere.com
              </a>.
            </p>
            <p>Best regards,</p>
            <p><strong>The SHARESphere Team</strong></p>
          </div>
          <div style="text-align: center; padding: 10px; background-color: #f1f1f1; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `, // Email content (HTML)
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: `User ${action === "approve" ? "approved" : "rejected"} successfully!` });
  } catch (error) {
    console.error("Error approving/rejecting user:", error);
    res.status(500).json({ message: "Failed to update user status" });
  }
});



// Get User Profile
app.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp -otpExpires");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: user._id }).populate("author", "firstName lastName profilePic");
    res.json({ user, posts });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Update Profile Picture
  
  app.post("/update-profile-pic", authenticateUser, upload.single("profilePic"), async (req, res) => {
    try {
      console.log("File received:", req.file); // Debugging
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  
      // Upload the new profile picture to Cloudinary
      const profilePicUrl = await uploadToCloudinary(req.file);
      console.log("Cloudinary URL:", profilePicUrl); // Debugging
  
      // Update the user's profile picture in the database
      user.profilePic = profilePicUrl;
      await user.save();
  
      res.json({ message: "✅ Profile picture updated successfully!", profilePic: profilePicUrl });
    } catch (error) {
      console.error("Profile picture update error:", error); // Debugging
      res.status(500).json({ message: "❌ Server error, please try again later." });
    }
  });

// Create a Post
app.post("/posts", authenticateUser, upload.single("image"), async (req, res) => {
  const { title, content, type, category } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const imageUrl = req.file ? await uploadToCloudinary(req.file) : null;

    const newPost = new Post({
      author: user._id,
      time: new Date().toISOString(),
      title,
      content,
      type,
      category,
      image: imageUrl,
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
    const post = await Post.findById(req.params.id)
      .populate("author", "firstName lastName profilePic")
      .populate("comments.author", "firstName lastName profilePic"); // Populate comment authors

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error("Post fetch error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

app.post("/posts/:id/comments", authenticateUser, async (req, res) => {
  const { text } = req.body;
  const postId = req.params.id;

  // Validate comment text
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ message: "Comment text cannot be empty." });
  }

  if (text.length > 500) {
    return res.status(400).json({ message: "Comment text cannot exceed 500 characters." });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      author: req.user.id, // The authenticated user's ID
      text,
    };

    post.comments.push(newComment);
    await post.save();

    // Populate the author field in the response
    const populatedComment = await Post.populate(post, {
      path: "comments.author",
      select: "firstName lastName profilePic",
    });

    res.status(201).json({
      message: "✅ Comment added successfully!",
      comment: populatedComment.comments[post.comments.length - 1], // Return the latest comment
    });
  } catch (error) {
    console.error("Comment creation error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});

// ... (Previous imports and setup remain the same)

// Update Profile Settings
app.put("/profile", authenticateUser, async (req, res) => {
  const { firstName, lastName, bio } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update profile fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;

    await user.save();
    res.json({ message: "✅ Profile updated successfully!", user }); // Return updated user
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});






// Change Password
app.put("/change-password", authenticateUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: "✅ Password changed successfully!" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});

// Update Notification Preferences
app.put("/notifications", authenticateUser, async (req, res) => {
  const { email, sms, push } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update notification preferences
    user.notifications = { email, sms, push };
    await user.save();

    res.json({ message: "✅ Notification preferences updated successfully!", notifications: user.notifications });
  } catch (error) {
    console.error("Notification update error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});

// Update Privacy Settings
app.put("/privacy", authenticateUser, async (req, res) => {
  const { showProfile, showActivity, shareResourcesPublicly } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update privacy settings
    user.privacy = { showProfile, showActivity, shareResourcesPublicly };
    await user.save();

    res.json({ message: "✅ Privacy settings updated successfully!", privacy: user.privacy });
  } catch (error) {
    console.error("Privacy update error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});

// Update Theme Customization
app.put("/theme", authenticateUser, async (req, res) => {
  const { mode, accentColor } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update theme settings
    user.theme = { mode, accentColor };
    await user.save();

    res.json({ message: "✅ Theme updated successfully!", theme: user.theme });
  } catch (error) {
    console.error("Theme update error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});

// Delete Account
app.delete("/delete-account", authenticateUser, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "✅ Account deleted successfully!" });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ message: "❌ Server error, please try again later." });
  }
});




//searching

// Middleware
app.use(express.json());
app.use(cors());


// Get all posts
const getAllPosts = async (req, res) => {
  const { type, title, category, sort, select } = req.query;
  const queryObject = {};

  if (type) {
    queryObject.type = type;
  }

  if (category) {
    queryObject.category = category;
  }

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  let apiData = Post.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 7;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  try {
    const myData = await apiData;
    res.status(200).json({ myData, nbHits: myData.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get posts by category
const getPostsByCategory = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const posts = await Post.find({ category: category });
    res.status(200).json({ posts, nbHits: posts.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Define routes for posts
const router = express.Router();
router.route('/').get(getAllPosts); // Get all posts
router.route('/posts/category').get(getPostsByCategory); // Get posts by category

// Use the routes for the API
app.use("/api/products", router); // This will now use /api/posts and /api/posts/category

// Sample root endpoint
app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

// Connect to MongoDB and start the server
const start = async () => {
  try {
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Start the application
start();




// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));