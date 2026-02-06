const fs = require("fs");
const eventEmitter = require("./events");

// Promise-based user reader
function readUsersPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile("users.json", "utf8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

async function router(req, res) {
    if (req.url === "/health") {
        res.end("Server is healthy");
    }

    else if (req.url === "/login") {
        eventEmitter.emit("userLogin");
        res.end("User logged in successfully");
    }

    else if (req.url === "/users") {
        try {
            // async/await usage
            const users = await readUsersPromise();
            eventEmitter.emit("dataFetched");
            res.end(users);
        } catch (err) {
            res.statusCode = 500;
            res.end("Error reading users");
        }
    }

    else {
        res.statusCode = 404;
        res.end("Not Found");
    }
}

module.exports = router;
