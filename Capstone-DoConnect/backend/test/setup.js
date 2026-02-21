process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

//Connecting to test DB before all tests
before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    console.log('Connected to TEST database');

    await User.create({
        username: 'superadmin',
        email: 'superadmin@test.com',
        password: 'admin123',
        role: 'admin'
    });
});
//Cleaning test DB after tests
after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Test database cleaned');
});

module.exports = { expect, request, app };

