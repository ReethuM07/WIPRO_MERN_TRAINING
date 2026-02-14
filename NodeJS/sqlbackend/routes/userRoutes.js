
const express = require("express");

const controller =require("../controllers/userController"); // Import the user controller to ensure it's 

//is used to create a new router instance, which will handle the routes related to users.
const router = express.Router();

router.get("/users", controller.getAllUsers); // Define a route for GET requests to "/users" that will invoke the getAllUsers function from the user controller.("URL Mapping Handler")

module.exports = router; // Export the router instance so it can be used in other parts of the application, such as the main server file (app.js).




