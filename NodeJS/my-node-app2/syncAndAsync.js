//synchronous

const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("bigfile.txt"); // BLOCKING

console.log("File read complete");
console.log("End");

//Asynchronous

const fs = require("fs");

console.log("Start");

fs.readFile("bigfile.txt", "utf-8", () => {
  console.log("File read complete");
});

console.log("End");
