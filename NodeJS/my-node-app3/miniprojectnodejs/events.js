const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Event listeners
eventEmitter.on("userLogin", () => {
    console.log("EVENT: User logged in");
});

eventEmitter.on("dataFetched", () => {
    console.log("EVENT: User data fetched");
});

module.exports = eventEmitter;
