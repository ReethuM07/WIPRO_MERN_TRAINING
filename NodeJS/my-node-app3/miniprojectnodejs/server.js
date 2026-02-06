const http = require("http");
const fs = require("fs");
const router = require("./router");
const logRequest = require("./logger");

const server = http.createServer((req, res) => {
    logRequest(req.method, req.url);

    if (req.url === "/" && req.method === "GET") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Error loading page");
            } else {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    } else {
        router(req, res);
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
