let pg_obj = require('../database/pg_connect'); // Import the PostgreSQL connection object
let jwt = require('jsonwebtoken'); // Import the JSON Web Token library
require('dotenv').config(); // Load environment variables from a .env file

let logout = async (req, res) => {
    try {
        let { token } = req.headers; // Extract the token from the request headers
        let payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and extract the payload
        console.log("Token is valid:", payload); // Log the payload for debugging purposes
        await pg_obj.query('delete from session where userid = $1 and isactive = true', [payload.id]); // Delete the active session for the user from the database
        res.status(200).send({ message: 'Logout successful' }); // Send a success response
    } catch (err) {
        console.log(err); // Log the error for debugging purposes
        res.status(500).send("Something went wrong"); // Send an error response
    }
};

module.exports = logout; // Export the logout function
