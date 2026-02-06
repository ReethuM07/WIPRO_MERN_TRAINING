const EventEmitter = require("events");

const emitter = new EventEmitter();

//It broadcast only within the same event name. It doesn`t 
//broadcast across different events

// Listener
emitter.on("userRegistered", (user) => {
    console.log(`Welcome email sent to ${user}`);
});
emitter.on("paymentSuccess", (amount) => {
    console.log(`Payment of Rs. ${amount} is done`);
});

// Emit event
emitter.emit("userRegistered", "Reethu");
emitter.emit("paymentSuccess", 100000);

/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/