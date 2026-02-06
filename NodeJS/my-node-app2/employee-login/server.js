const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const server = http.createServer((req, res) => {

    // Serve HTML login page
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("login.html", "utf8", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // Handle login form submission
    else if (req.method === "POST" && req.url === "/login") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const formData = querystring.parse(body);
            const empName = formData.empName;

            const loginTime = new Date().toLocaleString();
            const logEntry = `Employee: ${empName}, Login Time: ${loginTime}\n`;

            fs.appendFile("employeeactivity.log", logEntry, err => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Login recorded successfully");
            });
        });
    }
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
