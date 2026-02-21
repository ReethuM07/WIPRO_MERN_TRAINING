// ==========================================
// MongoDB Schema Design — Online Retail Platform
// ==========================================


// ------------------------------
// USE / CREATE DATABASE
// ------------------------------
use ('onlineRetailDB');


// ------------------------------
// 1. PRODUCTS COLLECTION
// ------------------------------
db.createCollection("products");

db.products.insertMany([
  {
    name: "Samsung Galaxy S26",
    category: "Mobile Phones",
    description: "6G smartphone with 512GB storage and AI features",
    price: 89999,
    stock: 60,
    brand: "Samsung",
    specifications: {
      color: "Phantom Titanium",
      screenSize: "6.3 inches",
      battery: "4500 mAh"
    },
    createdAt: new Date("2026-02-10T10:00:00Z"),
    updatedAt: new Date("2026-03-05T14:00:00Z")
  },
  {
    name: "Women's Cotton Kurti",
    category: "Clothing",
    description: "Comfort-fit cotton kurti",
    price: 1299,
    stock: 150,
    brand: "Biba",
    specifications: {
      size: ["S", "M", "L", "XL"],
      color: "Teal Blue"
    },
    createdAt: new Date("2026-02-15T09:30:00Z"),
    updatedAt: new Date("2026-02-15T09:30:00Z")
  }
]);


// ------------------------------
// 2. USERS COLLECTION
// ------------------------------
db.createCollection("users");

db.users.insertMany([
  {
    username: "reethu_g",
    email: "reethu@example.com",
    passwordHash: "$2b$10$Q29tQmFySGFzaFRlc3QxMjM0",
    role: "customer",
    createdAt: new Date("2026-02-05T08:45:00Z"),
    lastLogin: new Date("2026-03-10T11:45:00Z")
  },
  {
    username: "admin_reethu",
    email: "admin@example.com",
    passwordHash: "$2b$10$Q29tQmFySGFzaFRlc3QxMjM0",
    role: "admin",
    createdAt: new Date("2026-01-15T08:00:00Z"),
    lastLogin: new Date("2026-03-08T09:00:00Z")
  }
]);


// ------------------------------
// 3. ORDERS COLLECTION
// ------------------------------
db.createCollection("orders");

// Fetch required IDs
const samsungId = db.products.findOne({ name: "Samsung Galaxy S26" })._id;
const kurtiId  = db.products.findOne({ name: "Women's Cotton Kurti" })._id;
const userId   = db.users.findOne({ username: "reethu_g" })._id;

// Insert order document
db.orders.insertMany([
  {
    userId: userId,
    orderDate: new Date("2026-03-10T12:00:00Z"),
    products: [
      { productId: samsungId, quantity: 1, priceAtPurchase: 89999 },
      { productId: kurtiId, quantity: 2, priceAtPurchase: 1299 }
    ],
    totalAmount: 92597,
    status: "Delivered",
    paymentMethod: "UPI",
    shippingAddress: {
      street: "MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India"
    }
  }
]);


// ------------------------------
// 4. INDEXES
// ------------------------------
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.orders.createIndex({ userId: 1 });
db.users.createIndex({ email: 1 }, { unique: true });



// ------------------------------
// 5. SAMPLE QUERIES
// ------------------------------

// a) Retrieve all products in a category
db.products.find({ category: "Mobile Phones" }).toArray();

// b) Find product by name (case-insensitive)
db.products.find({ name: /Samsung/i }).toArray();

// c) Retrieve all orders for a specific user
db.orders.find({ userId: userId }).toArray();

// d) Find all users registered after a specific date
db.users.find({
  createdAt: { $gte: new Date("2026-02-01") }
}).toArray();

// e) Retrieve orders with product details using aggregation
db.orders.aggregate([
  { $match: { userId: userId } },
  {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "productDetails"
    }
  }
]).toArray();


// ----------------------
// FINAL MESSAGE 
// ----------------------
print("MongoDB setup complete. Collections created, data inserted, indexes created, and queries executed successfully.");
