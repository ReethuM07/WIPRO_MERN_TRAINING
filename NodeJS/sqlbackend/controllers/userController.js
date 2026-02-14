const pool = require("../db/connection"); // Import the database connection pool

exports.getAllUsers = async (req,res,next) => {
    try{

       const [rows] = await pool.query("SELECT * FROM users");
        res.status(200).json({rows});
    }
catch(error){
    next(error);
}
};

exports.createUsers = async (req,res,next) => {
    try{
      // const{name,email} = req.body; // Extract name and email from the request body
        await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [req.body.name, req.body.email]);
        console.log(req.body.name, req.body.email);
        res.status(200).json({message: "User created successfully"});
    }
catch(error){
    next(error);
}
};