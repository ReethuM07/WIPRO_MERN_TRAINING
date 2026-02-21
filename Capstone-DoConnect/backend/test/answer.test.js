const { expect, request, app } = require('./setup');

describe('ANSWER TESTS', () => {

    let token;
    let questionId;
    let answerId;
    
    //Creating user and question before tests
    before(async () => {
        const user = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'auser',
                email: 'a@test.com',
                password: 'pass123'
            });

        token = user.body.token;

        const q = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Q for answer',
                description: 'this is a valid description',
                topic: 'React'
            });

        if (q.body.data) {
            questionId = q.body.data._id;
        }
    });

    it('should create answer', async () => {
        const res = await request(app)
            .post('/api/answers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Test answer',
                questionId
            });

        expect(res.status).to.equal(201);
        answerId = res.body.data._id;
    });
});

