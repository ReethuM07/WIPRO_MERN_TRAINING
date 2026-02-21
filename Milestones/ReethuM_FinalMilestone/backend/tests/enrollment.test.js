const request = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');

const app = require('../app');
const Program = require('../models/Program');
const Enrollment = require('../models/Enrollment');

describe('Enrollment API', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/fittrack_test');
    });

    beforeEach(async () => {
        await Program.deleteMany({});
        await Enrollment.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should return 201 on successful enrollment', async () => {
        await Program.create({
            programId: 'TEST001',
            name: 'Test Program',
            category: 'Test',
            level: 'Beginner',
            price: 999
        });

        const res = await request(app)
            .post('/api/enroll')
            .send({
                userId: 'USR101',
                programId: 'TEST001'
            });

        expect(res.status).to.equal(201);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Enrollment successful');
    });

    it('should return 400 for duplicate enrollment', async () => {
        await Program.create({
            programId: 'TEST001',
            name: 'Test Program',
            category: 'Test',
            level: 'Beginner',
            price: 999
        });

        await Enrollment.create({
            userId: 'USR101',
            programId: 'TEST001'
        });

        const res = await request(app)
            .post('/api/enroll')
            .send({
                userId: 'USR101',
                programId: 'TEST001'
            });

        expect(res.status).to.equal(400);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal('User already enrolled in this program');
    });

});