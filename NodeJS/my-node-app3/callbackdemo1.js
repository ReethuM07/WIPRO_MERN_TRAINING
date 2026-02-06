// -------------------------------
// Callback example
// -------------------------------
function processPayment(amount, callback) {
    setTimeout(() => {
        callback("Payment Successful");
    }, 3000);
}

console.log("example of callback");

processPayment(5500, (msg) => {
    console.log(msg);
});

// -------------------------------
// Promise example
// -------------------------------
function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User Data");
        }, 2000);
    });
}

fetchUser().then((data) => {
    console.log(data);
});
