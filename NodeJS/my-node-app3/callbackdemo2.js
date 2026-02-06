// function login(cb){

//     setTimeout(()=>{
//         console.log("Login Succesful");
//         cb();
//     },2000)
// }

// function fetchProfile(cb){
    
//     setTimeout(()=>{
//         console.log("Profile fetched");
//         cb();
//     },2000)
// }

// function fetchOrders(cb){
    
//     setTimeout(()=>{
//         console.log("Orders fetched");
//         cb();
//     },2000)
// }

// login(()=>{

//     fetchProfile(()=>{
//         fetchOrders(()=>{
//             console.log("All Done");
//         });
//     });
// });



//using promise

// function login() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Login Successful");
//             resolve("User logged in");
//         }, 2000);
//     });
// }

// function fetchProfile() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Profile fetched");
//             resolve({
//                 name: "Reethu",
//                 role: "User"
//             });
//         }, 2000);
//     });
// }

// function fetchOrders() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Orders fetched");
//             resolve([
//                 { orderId: 101, item: "Book" },
//                 { orderId: 102, item: "Phone" }
//             ]);
//         }, 2000);
//     });
// }


// login()
//     .then((loginData) => {
//         console.log(loginData);
//         return fetchProfile();
//     })
//     .then((profileData) => {
//         console.log(profileData);
//         return fetchOrders();
//     })
//     .then((ordersData) => {
//         console.log(ordersData);
//         console.log("All Done");
//     })
//     .catch((err) => {
//         console.log("Error:", err);
//     });


const login = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log("Login successful");
      resolve();
    }, 2000);
  });

const fetchProfile = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log("Profile Fetched");
      resolve();
    }, 2000);
  });

const fetchOrders = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log("Orders Fetched");
      resolve();
    }, 2000);
  });

login()
  .then(() => fetchProfile())
  .then(() => fetchOrders())
  .catch(err => console.error(err));
