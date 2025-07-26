const mongoose = require("mongoose");

// Function to handle connection errors
const handleError = (error) => {
  console.error("Database connection error:", error);
  process.exit(1); // Exit process with failure
};

// Connect to MongoDB
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.URIMONGO, {});
    console.log("Database connected successfully");
  } catch (error) {
    handleError(error);
    console.error("❌ Database connection error:", error);
  }
};

// Export the connection function
module.exports = ConnectDB;
