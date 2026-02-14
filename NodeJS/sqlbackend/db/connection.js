const mysql = require("mysql2/promise");
require("dotenv").config(); // It will load the environment variables from the .env file into process.env


const pool =mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
connectionLimit: 10, // Optional: limits the number of connections in the pool
waitForConnections: true, // Optional: waits for a connection to be available before throwing an error
})

module.exports = pool;
