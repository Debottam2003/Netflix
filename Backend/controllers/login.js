// Import required modules
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let pg_obj = require('../database/pg_connect');

// Login controller function
let login = async (req, res) => {
    try {
        // Destructure email and password from request body
        let { email, password } = req.body;
        console.log(email);
        // Query the database for user with the provided email
        let data = await pg_obj.query('select id, password from users where email = $1', [email]);
        console.log(data.rows);

        // If no user is found, send a 400 response
        if (data.rows.length == 0) {
            res.status(400).send("Invalid username or password");
        } else {
            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, data.rows[0].password, async (err, result) => {
                if (err) {
                    res.status(500).send("wrong credentials...");
                }
                if (result) {
                    // If password matches, generate a JWT token
                    let time = Date.now();
                    let token = jwt.sign({ id: data.rows[0].id, email: email, timeinstance: time }, process.env.JWT_SECRET);

                    // Send a success response with the token
                    res.status(200).send({ msg: "user logged in successfully", token: token });

                    // Insert a new session into the database
                    await pg_obj.query('insert into session(isactive, userid, token, timeinstance) values($1, $2, $3, $4)', [true, data.rows[0].id, token, time]);
                } else {
                    // If password does not match, send a 400 response
                    res.status(400).send("Invalid username or password");
                }
            });

            // This line is redundant and will never be reached
            if (data.rows[0].password === password) {
                res.ststus(200).send('valid user');
            }
        }
    } catch (err) {
        // Log any errors and send a 500 response
        console.log(err);
        res.status(500).send("something went wrong");
    }
}

// Export the login function
module.exports = login;