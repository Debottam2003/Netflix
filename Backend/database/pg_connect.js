let {Pool} = require('pg');
require('dotenv').config();

let pg_obj = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pg_obj;