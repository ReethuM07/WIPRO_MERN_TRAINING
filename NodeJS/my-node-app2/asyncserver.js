console.log("1. starting async server...");
setTimeout(() => {
    console.log("3 . Timer done!");
}, 3000);
let sum = 0;
for (let i = 0; i < 1000000000; i++) {
    sum += i;
}
console.log("2. End of JS execution");
    /* timer is expired after 3 seconds but call back waited because js thread was busy
in loop */ /* call back executed only when JS thread is free */