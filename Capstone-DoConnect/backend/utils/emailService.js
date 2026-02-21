const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');

//Email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
//Notify the admin
const notifyAdmins = async (subject, htmlContent) => {
    try {
        const admins = await Admin.find({}).select('email');
        const adminEmails = admins.map(admin => admin.email);

        if (adminEmails.length === 0) {
            if (process.env.NODE_ENV !== 'test') {
                console.log('No admins found to notify');
            }
            return;
        }

        const mailOptions = {
            from: `"DoConnect" <${process.env.EMAIL_USER}>`,
            to: adminEmails.join(','),
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        if (process.env.NODE_ENV !== 'test') {
            console.log('Email sent:', info.messageId);
        }
        return info;
    } catch (error) {
        console.error('Email sending error:', error);
    }
};
//New question email
const newQuestionNotification = async (question, user) => {
    const subject = `New Question Asked: ${question.title}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #007bff;">New Question Posted</h2>
            <p><strong>${user.username}</strong> asked a new question:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3 style="margin-top: 0; color: #333;">${question.title}</h3>
                <p style="color: #666;">${question.description.substring(0, 200)}${question.description.length > 200 ? '...' : ''}</p>
                <p><strong>Topic:</strong> ${question.topic}</p>
            </div>
            <p>Please review and approve this question:</p>
            <a href="http://localhost:3000/admin/questions/pending" 
               style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                Review Question
            </a>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 12px;">This message is from DoConnect.</p>
        </div>
    `;

    await notifyAdmins(subject, html);
};
//New answer email
const newAnswerNotification = async (answer, user, question) => {
    const subject = `New Answer Posted: ${question.title}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #28a745;">New Answer Posted</h2>
            <p><strong>${user.username}</strong> answered a question:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h4 style="margin-top: 0; color: #007bff;">Question: ${question.title}</h4>
                <p style="color: #666;">${answer.content.substring(0, 200)}${answer.content.length > 200 ? '...' : ''}</p>
            </div>
            <p>Please review and approve this answer:</p>
            <a href="http://localhost:3000/admin/answers/pending" 
               style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                Review Answer
            </a>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 12px;">This message is from DoConnect.</p>
        </div>
    `;

    await notifyAdmins(subject, html);
};

module.exports = {
    newQuestionNotification,
    newAnswerNotification
};