const EventEmitter = require("events");

const emitter = new EventEmitter();

//one event multiple listeners
// Listener
emitter.on("Order Placed", (data) => {
    console.log(`Order ${data.orderId} processed`);
});

emitter.on("Order Placed", (data) => {
    console.log(`Email sent for ${data.user}`);
});

emitter.on("Order Placed", (data) => {
    console.log(`Inventory updated for order id ${data.orderId}`);
});

// Emit event
emitter.emit("Order Placed", {
    user: "Reethu",
    orderId: 101
});

/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/
