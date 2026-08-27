const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Config/databaseConfig");

const productRoute = require("./Routers/productRoute");
const userRoute = require("./Routers/userRoute");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/products", productRoute); // Use the product routes for any requests to /products
app.use("/users", userRoute); // Use the user routes for any requests to /users

// Return JSON responses for unknown routes and unexpected errors
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
