// Import the PostgreSQL connection object
let pg_obj = require('../database/pg_connect');

// Define the home controller function
const home = async (req, res) => {
    try {
        // Query the movies table
        let movies = await pg_obj.query('select * from movies');
        // Query the series table
        let series = await pg_obj.query('select * from series');
        // Send the queried data as a response
        res.status(200).send({movies: movies.rows, series: series.rows});
    } catch (err) {
        // Log the error and send a 500 status code with an error message
        console.log(err);
        res.status(500).send("something went wrong cannot fetch data");
    }
};

// Export the home controller function
module.exports = home;