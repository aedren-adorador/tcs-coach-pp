const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Nodemailer GMail Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    }
});

// Email settings for account creation
function generateVerificationToken(email) {
  const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
  return jwt.sign({ email, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendEmail(emailAddressInput, token) {
    const verificationLink = `${process.env.REACT_APP_SYS_URL}/api/auth/verify?token=${token}&email=${emailAddressInput}`
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: emailAddressInput, // list of receivers
      subject: "[Action Required] The Coding School Application - Verify your account",
      html: `<p>Dear Applicant</p><p>Thank you for your interest in applying to The Coding School! To proceed with your account creation, kindly verify your email by clicking on this link: <a href=${verificationLink}><p>Confirm Here</p><a/></p>`
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
      html: `<p>Dear ${applicantName}</p>
      <p>We are pleased to inform you that you have passed the initial screening for the ${position} position!</p>
      
      <p>The next step of the application process would be an asynchronous video interview which will further make us get to know you more in terms of experience, values, and qualities for the role.</p>
      
     <p>Please note that you have until ${deadline} to take the interview, and <strong>it can be accessed by logging-in to your <a href=${process.env.MAIN_URL}>TCS Coach++account.</a></strong></p> <p>Goodluck!</p> <p>Warm regards,</p><br/>
      <p>The Coding School Recruitment Team</p>`
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

// Email settings for sending demo invite email
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
          <li>Log-in to your <a href=${process.env.MAIN_URL}>TCS Coach++ Account</a>  and attached a zip file (.zip) of your demo. Maximum video size is 150 MB.</li>
          <li>Submit your link and wait for our team to reach out to you in a few days.</li>
      </ol>

      <p>Cheers and Goodluck!</p><br/>
      <p>The Coding School Recruitment Team</p>
      `
    })
}

// Email settings for sending onboarding requirements
async function sendOnboardingRequirementsChecklist(emailAddressInput, position, applicantName) {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "Congratulations — You Have Successfully Passed The Coding School's Application Process",
      html: `
      <p>Dear ${applicantName},</p>
      <p>We are thrilled to inform you that you have successfully passed The Coding School's application process for the
      ${position} position! Congratulations on this significant achievement!</p>
      
      <p>Your dedication, skills, and passion have truly stood out during the entire selection process. We are confident that you will make a valuable addition to our team and contribute positively to The Coding School's mission.</p>
      
      <p>Our operations team will be in touch with you regarding your offer letter.</p>
      <p>We are excited to have you on board and look forward to seeing your contributions to our organization. Below are the specific steps and requirements that you need to submit should you decide to sign the offer letter.</p>
      <ol>
          <li>Make the zip file containing all indicated files below and upload the zip file in your <a href=${process.env.MAIN_URL}>TCS Coach++ Account</a>. Maximum file size is 5 MB.</li>
          <li>Kindly upload the following digital files in the folder:
              <ul>
                  <li>Birth Certificate</li>
                  <li>BIR Income Tax Return (if applicable)</li>
                  <li>2 Valid IDs</li>
                  <li>NBI Clearance (valid for the current year period)</li>
              </ul>
          </li>
          <li>Plot your week availability in this <a href='https://www.when2meet.com/?24276406-5Ykk4'>When2Meet Link</a> for the Shadow Teaching</li>
      </ol>

      <p>
          Once again, congratulations on this accomplishment! We are thrilled to welcome you to The Coding School community and
          are confident that you will excel in your new role.
          
          If you have any questions or need further assistance, please do not hesitate to contact us at coaches@coding.ph.
      </p>

      <p>Warm regards,</p><br/>
      <p>The Coding School Recruitment Team</p>
      `
    })
}


async function sendRejectionEmail(emailAddressInput, applicantName) {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "The Coding School Application Update",
      html: `
      <p style='font-size: 14px'>Dear ${applicantName}</p><br />
      <p>Thank you for your interest in The Coding School and for submitting your application. We appreciate the time and effort
      you have dedicated to the application process.</p>
      
      <p>After thorough review, we regret to inform you that we are unable to offer you a position in our program at this time.
      While we were impressed by your qualifications and achievements, we have selected candidates whose skills and experience
      better align with the needs of our workforce.</p>
      
      <p>We understand that this news may be disappointing, but please know that our decision was made after careful
      consideration of all applicants. We encourage you to continue pursuing your passion for coding and exploring other
      opportunities in the field.</p>
      
      <p>We sincerely appreciate your interest in The Coding School and wish you the best in your future endeavors. Should you
      have any questions or require feedback on your application, please do not hesitate to reach out to us.</p>
      
      <p>Thank you again for considering The Coding School. We wish you success in your future endeavors.</p>
    
      <p>Warm regards,</p><br />
      <p>The Coding School Recruitment Team</p>
      `
    })
}


async function sendRecruiterNotif() {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "[Action Required] You have a Pending TCS Coach++ Applicant Screening Task",
      html: `
      <p style='font-size: 14px'>Dear The Coding School Recruitment Team</p><br />
      <p>You have a new pending task in <a href=${process.env.MAIN_URL}>TCS Coach++ Account</a></p>
      <p>Please log-in to your admin account for more information.</p>
      <p>Thanks and have a great day.</p><br />
      <p>TCS Coach++</p>
      `
    })
}

// Email Settings for Rejection Email
module.exports = {generateVerificationToken, generateInterviewToken, sendEmail, sendInterviewInvite, generateNewPasswordToken, sendNewPasswordVerification, generateNewEmailToken, sendNewEmailVerification, generateForgotPasswordToken, sendForgotPasswordVerification, sendDemoInvite, sendOnboardingRequirementsChecklist, sendRejectionEmail, sendRecruiterNotif};