const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Nodemailer GMail Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: 'lzak mkcu qfft unlu',
    }
});

// Email settings for account creation
function generateVerificationToken(email) {
  const expirationTime = Math.floor(Date.now() / 1000) + 45 * 60;
  return jwt.sign({ email, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendEmail(emailAddressInput, token) {
    const verificationLink = `http://localhost:3001/api/auth/verify?token=${token}&email=${emailAddressInput}`
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: emailAddressInput, // list of receivers
      subject: "[Action Required] The Coding School Application - Verify your account",
      html: `<p style='font-size: 14px'>Dear Applicant</p><br/><p>Thank you for your interest in applying to The Coding School! To proceed with your account creation, kindly verify your email by clicking on this link: <a href=${verificationLink}><p>Confirm Here</p><a/></p>`
    })
}

// Email settings for interview submission
function generateInterviewToken(applicantID, jobAppID) {
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign({ applicantID, jobAppID, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendInterviewInvite(emailAddressInput, position, deadline, applicantName) {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "Congratulations! The Coding School Application - Interview Invitation",
      html: `<p style='font-size: 14px'>Dear ${applicantName}</p><br/><p>We are pleased to inform you that you have passed the initial screening for the ${position} position! The next step of the application process would be an asynchronous video interview which will further make us get to know you more in terms of experience, values, and qualities for the role. Do not worry as we have provided a quick tutorial before you take the interview. Please note that you have until ${deadline} to take the interview, and <strong>it can be accessed by logging-in to your TCS Coach++ account.</strong> Goodluck!`
    })
}


module.exports = {generateVerificationToken, generateInterviewToken, sendEmail, sendInterviewInvite};