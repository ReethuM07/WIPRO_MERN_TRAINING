const EventEmitter = require("events");
const emitter = new EventEmitter();

// Async helper functions

const orderPlaced = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
};

const sendEmail = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
};

const updateInventory = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
};


// Listener 1
emitter.on("Order Placed", async (data) => {
    console.log("Listener1 started");
    await orderPlaced();
    console.log(`Order ${data.orderId} processed`);
});

// Listener 2
emitter.on("Order Placed", async (data) => {
    console.log("Listener2 started");
    await sendEmail();
    console.log(`Email sent for order by ${data.user}`);
});

// Listener 3
emitter.on("Order Placed", async (data) => {
    console.log("Listener3 started");
    await updateInventory();
    console.log(`Inventory updated for order ${data.orderId}`);
});

// Emit event
 
console.log("Before Emit");

emitter.emit("Order Placed", {
    user: "Niti Dwivedi",
    orderId: 101
});

console.log("After Emit");
