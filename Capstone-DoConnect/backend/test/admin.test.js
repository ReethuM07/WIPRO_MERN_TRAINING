const { expect, request, app } = require('./setup');
const User = require('../models/User');

describe('ADMIN TESTS', () => {

    let token;
    //Creating admin user before tests
    before(async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'admin',
                email: 'admin@test.com',
                password: 'admin123'
            });

        token = res.body.token;
        
        //Updating role to admin
        await User.findOneAndUpdate(
            { email: 'admin@test.com' },
            { role: 'admin' }
        );
    });

    it('should get users list', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
    });

    it('should get dashboard stats', async () => {
        const res = await request(app)
            .get('/api/admin/stats')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
    });
});
