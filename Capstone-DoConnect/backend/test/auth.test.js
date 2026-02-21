const { expect, request, app } = require('./setup');

describe('AUTH TESTS', () => {

    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };
    //Register user
    it('should register user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.status).to.equal(201);
    });
    //Login user
    it('should login user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.status).to.equal(200);
    });
    //Wrong password
    it('should reject wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: 'wrong'
            });

        expect(res.status).to.equal(401);
    });
});
