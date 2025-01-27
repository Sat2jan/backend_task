// backend/controllers/userController.js
import User from "../models/userModel.js";
import History from "../models/historyModel.js";
import mongoose from "mongoose";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from the database
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Create a new user
// /backend/controllers/userController.js
 export const createUser = async (req, res) => {
  const { username, points } = req.body;

  try {
    // Ensure the username is provided when creating a new user
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const newUser = new User({
      username,
      points: points || 0, // Default to 0 if no points are provided
    });

    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Claim points
export const claimPoints = async (req, res) => {
    const { username } = req.body; // Get the username from the request body
  
    try {
      // Find the user by username (assuming you want to find by username)
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Generate random points between 1 and 10
      const randomPoints = Math.floor(Math.random() * 10) + 1;
  
      // Update the user's points
      user.points += randomPoints;
  
      await user.save(); // Save the updated user
  
      // Create a claim history entry
      const newHistory = new History({
        userId: user._id, // Use the user ID (MongoDB _id)
        pointsClaimed: randomPoints, // Points claimed by the user
      });
      await newHistory.save();
  
      // Return the updated user and the claim history
      res.status(200).json({ user, history: newHistory });
    } catch (error) {
      console.error("Error claiming points:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  