// Define a class named User
var User = /** @class */ (function () {
    // Constructor to initialize variables
    function User() {
        this.username = "";
        this.password = "";
    }
    // Method to take input
    User.prototype.input = function (username, password) {
        this.username = username;
        this.password = password;
    };
    // Method to display output
    User.prototype.display = function () {
        console.log("Username: " + this.username);
        console.log("Password: " + this.password);
    };
    return User;
}());
// Create an object of the class
var user1 = new User();
// Call input method
user1.input("Reethu", "12345");
// Call display method
user1.display();
