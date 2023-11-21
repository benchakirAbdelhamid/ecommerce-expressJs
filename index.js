const express = require("express");
const mongoose = require("mongoose");
// cookies stocke token
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRouters = require('./routes/categories')
const productRouters = require('./routes/products')

//Config App
const app = express();
require("dotenv").config();

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE, { dbName: "NewDB" });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    return; 
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App is running on port ${port}`));
}

startServer();


//Middlewares ==>json body
app.use(express.json())
// Middlewares cookies
app.use(cookieParser())
// Middleware validator in db
app.use(expressValidator())

// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/category", categoryRouters);
app.use("/api/product", productRouters);


// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`app is renning on port ${port}`));