import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_CONF = {
  host: process.env.EMAIL_HOSTNAME,
  port: process.env.EMAIL_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(EMAIL_CONF);

// async..await is not allowed in global scope, must use a wrapper
export const send_email = async (to, subject, html) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, message: String(error) };
  }
};
