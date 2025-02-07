/** 
 * @author Debottam Kar
*/
// Import the express module
const express = require('express');
const cors = require('cors');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the router module
const router = require('./router/routes.js');

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// Use the router module for routes starting with /api
app.use('/api', router);

// Start the server and listen on the port specified in the environment variables
app.listen(process.env.PORT, () => {
    console.log("The server is running on port " + process.env.PORT);
});
