const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer')

// Mandatory Requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Nodemailer Config
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: 'lzak mkcu qfft unlu',
    }
});

async function sendEmail(emailAddressInput) {
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: emailAddressInput, // list of receivers
      subject: "[Action Required] The Coding School Application - Verify your account",
      html: "<p style='font-size: 14px'>Dear Applicant</h1><br/><p>Thank you for your interest in applying to The Coding School! To proceed with your account creation, kindly verify your email by clicking on this link: <b>* insert link *<b/></h1>"
    })
}

// Main Requests
app.post('/api/auth/verify-email', (req, res, next) => {
    console.log(req.body.email)
    console.log('First Middleware');
    sendEmail(req.body.email)
        .then(success => res.json({successMessage: 'Verification link sent to your email!'}))
})


module.exports = app;