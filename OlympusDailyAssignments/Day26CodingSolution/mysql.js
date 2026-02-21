
const mysql = require("mysql2/promise");
require("dotenv").config();

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100),
      price INT
    )
  `);

  await connection.execute(
    "INSERT INTO courses (title, price) VALUES (?,?)",
    ["Node JS", 5000]
  );

  console.log("Course Inserted Successfully");
  connection.end();
}

run();
