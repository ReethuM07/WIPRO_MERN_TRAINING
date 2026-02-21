const { expect, request, app } = require('./setup');

describe('QUESTION TESTS', () => {

    let token;
    let questionId;
    //Creating user before tests
    before(async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'quser',
                email: 'q@test.com',
                password: 'pass123'
            });

        token = res.body.token;
    });

    it('should create question', async () => {
        const res = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Question',
                description: 'This is a valid test description',
                topic: 'JS'
            });

        expect(res.status).to.equal(201);
        questionId = res.body.data._id;
    });

    it('should get all questions', async () => {
        const res = await request(app)
            .get('/api/questions');

        expect(res.status).to.equal(200);
    });

    it('should get question by id', async () => {
        const res = await request(app)
            .get(`/api/questions/${questionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
    });


});
