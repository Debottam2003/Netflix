// Import required modules
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let pg_obj = require('../database/pg_connect');
require('dotenv').config();

// Registration controller function
let register = async (req, res) => {
    try {
        // Log the request body
        console.log(req.body);

        // Destructure username, email, and password from the request body
        let { username, email, password } = req.body;

        // Check if the user already exists in the database
        let data = await pg_obj.query('select id from users where email = $1', [email]);
        if (data.rows.length > 0) {
            // If user exists, send a 400 status with an error message
            res.status(400).send("user already exists");
        } else {
            // Hash the password
            let hashed_password = await bcrypt.hash(password, 10);
            let time = Date.now();
            // Insert the new user into the database and return the inserted data
            let data = await pg_obj.query('insert into users(username, email, password) values($1, $2, $3) returning *', [username, email, hashed_password]);

            // Generate a JWT token for the new user
            let token = jwt.sign({ id: data.rows[0].id, email: data.rows[0].email, timeinstance: time }, process.env.JWT_SECRET);

            // Send a success response with the token
            res.status(200).send({ msg: "user registered successfully", token: token });

            // Insert the session information into the database
            await pg_obj.query('insert into session(isactive, userid, token, timeinstance) values($1, $2, $3, $4)', [true, data.rows[0].id, token, time]);
        }
    } catch (err) {
        // Log the error and send a 500 status with an error message
        console.log(err);
        res.status(500).send("something went wrong");
    }
};

// Export the register function
module.exports = register;