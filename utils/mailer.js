const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (to, subject, { title, description, action, creator, assignee }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `<h3>Task ${action}</h3>
    <p><b>Title:</b> ${title}</p>
    <p><b>Description:</b> ${description}</p>`,
  };
  await transporter.sendMail(mailOptions);
};