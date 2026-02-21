const { expect, request, app } = require('./setup');

describe('E2E USER FLOW', () => {

    let token;
    let questionId;
    let answerId;

    it('should complete full journey', async () => {
        //Register
        const register = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'flowuser',
                email: 'flow@test.com',
                password: 'pass123'
            });

        expect(register.status).to.equal(201);
        token = register.body.token;
        //Create question
        const question = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Flow Q',
                description: 'This is a valid flow description',
                topic: 'Test'
            });

        expect(question.status).to.equal(201);
        questionId = question.body.data._id;
        //Create answer
        const answer = await request(app)
            .post('/api/answers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Flow answer',
                questionId
            });

        expect(answer.status).to.equal(201);
        answerId = answer.body.data._id;
    });
});

