const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "randomfactsfaud@gmail.com",
        pass: "tbzztkgenguydokz",
    },
});

module.exports = transporter;
