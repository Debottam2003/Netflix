//session checking controller
let jwt = require('jsonwebtoken');
let pg_obj = require('../database/pg_connect');

/**
 * Handles the home route for session management.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.token - The JWT token for authentication.
 * @param {string} req.headers.session - The session status.
 * @param {Object} res - The response object.
 * 
 * @returns {void}
 * 
 * @description
 * This function verifies the JWT token and session status from the request headers.
 * If the token or session is missing, it responds with a 401 status code indicating unauthorized access.
 * If the token is invalid, it responds with a 401 status code indicating unauthorized access.
 * If the session is active, it checks the session details in the database and responds accordingly.
 * If the session is not active, it deletes the session from the database and responds with a session expired message.
 * In case of any errors during the process, it responds with a 500 status code indicating something went wrong.
 */
const home = async (req, res) => {
    try {
        let { token, session } = req.headers;
        console.log(token, session);
        let payload;
        if (!token || !session) {
            res.status(404).send("unauthorized access");
        }
        else {
            try {
                payload = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Token is valid:", payload.timeinstance);
            } catch (err) {
                console.error("Token verification failed:", err.message);
                res.status(401).send("unauthorized access");
            }
            if (session === "true") {
                let data = await pg_obj.query('select token, isactive, timeinstance from session where userid = $1', [payload.id]);
                let e = await pg_obj.query('select username, email from users where id = $1', [payload.id]);
                if (e.rows.length === 0 || e.rows[0].email !== payload.email) {
                    res.status(402).send("unautorized access");
                }
                console.log(data.rows);
                if (data.rows.length === 0 || 
                    data.rows[0].token !== token || 
                    data.rows[0].isactive === false || 
                    parseInt(data.rows[0].timeinstance) !== payload.timeinstance) {
                    console.log("session is not active");
                    res.status(403).send("unauthorized access");
                }
                else {
                    console.log("session is active");
                    console.log(e.rows[0].username);
                    res.status(200).send({ username: e.rows[0].username, session: true });
                }
            }
            else {
                await pg_obj.query(
                    'delete from session where userid = $1',
                    [payload.id]
                );
                res.status(200).send("session expired");
            }
        }
    }
    catch (err) {
        res.status(500).send("something went wrong during session check");
        console.log(err);
    }
};

module.exports = home;