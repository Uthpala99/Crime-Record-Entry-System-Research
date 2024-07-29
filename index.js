const express = require("express");
const mysql = require('mysql2/promise');
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000 ;

//DB Connection
async function connectToDatabase() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.HOST ,
        user: process.env.DB_USER_NAME ,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME
      });
      console.log('Connected to the database');
  
      // Close the connection
      await connection.end();
    } catch (err) {
      console.error('Error connecting to the database:', err.stack);
    }
  }
  
connectToDatabase();

// Data parsing
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);


//routes
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

// HTTP request logger
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
