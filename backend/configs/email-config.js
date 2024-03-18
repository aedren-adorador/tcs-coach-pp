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
    const verificationLink = `${process.env.REACT_APP_SYS_URL}/api/auth/verify?token=${token}&email=${emailAddressInput}`
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

// Email settings for password editing
function generateNewPasswordToken(applicantID, newPassword) {
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign({ applicantID, newPassword, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendNewPasswordVerification(emailAddressInput, applicantName, token) {
  const verificationLink = `${process.env.REACT_APP_SYS_URL}/api/general-request/verify-new-password?token=${token}&email=${emailAddressInput}`
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "[Action Required] The Coding School Password Change Verification",
      html: `<p style='font-size: 14px'>Dear ${applicantName},</p><br/><p>Kindly verify that you are changing your password by clicking on this link: <a href=${verificationLink}><p>Verify Password Change</p><a/></p>`
    })
}

// Email settings for email address editing
function generateNewEmailToken(applicantID, newEmail) {
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign({ applicantID, newEmail, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendNewEmailVerification(emailAddressInput, applicantName, token) {
  const verificationLink = `${process.env.REACT_APP_SYS_URL}/api/general-request/verify-new-email?token=${token}&email=${emailAddressInput}`
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "[Action Required] The Coding School Email Change Verification",
      html: `<p style='font-size: 14px'>Dear ${applicantName},</p><br/><p>Kindly verify that you are changing your email address by clicking on this link: <a href=${verificationLink}><p>Verify Email Change</p><a/></p>`
    })
}

// Email settings for forgot password editing
function generateForgotPasswordToken(email) {
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign({ email, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendForgotPasswordVerification(emailAddressInput, token) {
  const verificationLink = `${process.env.REACT_APP_SYS_URL}/api/auth/verify-forgot-password?token=${token}&email=${emailAddressInput}`
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "[Action Required] The Coding School Reset Password",
      html: `<p style='font-size: 14px'>Dear Applicant,</p><br/><p>Kindly confirm that you forgot and will change your password by clicking on this link: <a href=${verificationLink}><p>Reset Password</p><a/></p>`
    })
}


async function sendDemoInvite(emailAddressInput, position, applicantName) {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "Congratulations! The Coding School Application - Teaching Demo Submission",
      html: `
      <p'>Dear ${applicantName},</p><br />
      <p>Congratulations for passing the interview process for the ${position} position! The final step for the screening process would be a teaching demonstration of any topic you would like to teach.</p>
      <p>Here are some guidelines:</p>
      <ol>
          <li>Pick any topic you would like to demonstate teaching.</li>
          <li>Record yourself for 20-30 minutes with a prepared slideset.</li>
          <li>Upload your recording via Google Drive. Set the share settings to: "anyone with the link can view".</li>
          <li>Log-in to your <a href=${process.env.MAIN_URL}>TCS Coach++ Account</a>  and paste the link of your uploaded demo.</li>
          <li>Submit your link and wait for our team to reach out to you in a few days.</li>
      </ol>

      <p>Cheers and Goodluck!</p><br/>
      <p>The Coding School Recruitment Team</p>
      `
    })
}
module.exports = {generateVerificationToken, generateInterviewToken, sendEmail, sendInterviewInvite, generateNewPasswordToken, sendNewPasswordVerification, generateNewEmailToken, sendNewEmailVerification, generateForgotPasswordToken, sendForgotPasswordVerification, sendDemoInvite};