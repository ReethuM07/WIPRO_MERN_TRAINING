const express = require('express');
const session = require('express-session');
require('dotenv').config();

const { sequelize } = require('./models');

// Routes
const authRoutes = require('./userStory1-authentication/auth.routes');
const adminRoutes = require('./userStory2and5and6-rbacPaginationReport/admin.routes');
const instructorRoutes = require('./userStory2and5and6-rbacPaginationReport/instructor.routes');
const studentRoutes = require('./userStory3and4-studentandtrans/student.routes');

const app = express();

//VIEW ENGINE
app.set('view engine', 'ejs');

app.set('views', [
  __dirname + '/userStory1-authentication/views',
  __dirname + '/userStory2and5and6-rbacPaginationReport/views',
  __dirname + '/userStory3and4-studentandtrans/views'
]);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//ROUTES
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);
app.use('/students', studentRoutes);

//SERVER
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    console.log("Server running at http://localhost:3000");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
