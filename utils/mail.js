const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')

async function sendMailUsingNodemailer(details) {

    const { to, subject, text } = details

    const transporter = await nodemailer.createTransport({
        service: process.env.provider,
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.authUser,
            pass: process.env.authPassword
        },
    });

    const mailOptions = {
        from: process.env.authUser,
        to: to,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendMailUsingNodemailer }