let pg_obj = require('../database/pg_connect');

let movie = async (req, res, next)=>{
    try{
    console.log(req.body);
    let {id} = req.body;
    let query = `SELECT link FROM movies WHERE id = $1`;
    let values = [id];
    let result = await pg_obj.query(query, values);
    console.log(result);
    res.status(200).send(result.rows);
}
catch(err){
    console.log(err);
    res.status(500).send("server cannot send the movie link");
}
}

module.exports = movie;