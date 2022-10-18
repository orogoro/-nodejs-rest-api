const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: 'traficgo@meta.ua' };

  try {
    await sgMail.send(email);
    return true;
  } catch (err) {
    console.log(err);

    if (err.response) {
      console.error(err.response.body);
    }
  }
};

module.exports = sendEmail;
