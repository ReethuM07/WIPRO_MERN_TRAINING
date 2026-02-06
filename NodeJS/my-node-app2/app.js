// console.log("1. starting async server...");
// setTimeout(() => {
//     console.log("3 . Timer done!");
// }, 3000);
// let sum = 0;
// for (let i = 0; i < 1000000000; i++) {
//     sum += i;
// }
// console.log("2. End of JS execution");
//     /* timer is expired after 3 seconds but call back waited because js thread was busy
// in loop */ /* call back executed only when JS thread is free */


const fs    = require("fs");
const { clear } = require("console");
console.log("1. start");
 fs.readFile("data.txt",()=>{
        console.log("4. File read call back ");
    });
    console.log("2. Js thread continue")
    let count=0;
    const interval=setInterval(()=>{
        console.log(`3. serving other user ${++count}`);
        if(count==3) clearInterval(interval);
    },300);