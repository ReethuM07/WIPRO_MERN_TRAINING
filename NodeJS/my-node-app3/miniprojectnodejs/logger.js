const fs = require("fs");

function logRequest(method, url) {
    const log = `${new Date().toISOString()} | ${method} ${url}\n`;
    fs.appendFileSync("logs.txt", log);
}

module.exports = logRequest;
