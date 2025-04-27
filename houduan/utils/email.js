const nodemailer = require('nodemailer');
const config = require('../config/config').email;

const transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.user,
    pass: config.pass
  }
});

exports.sendVerificationEmail = async (to, code, type) => {
  let subject, text;

  switch (type) {
    case 'register':
      subject = '注册验证码';
      text = `您的注册验证码是: ${code}，有效期为10分钟。`;
      break;
    case 'password_reset':
      subject = '重置密码验证码';
      text = `您的重置密码验证码是: ${code}，有效期为10分钟。`;
      break;
    case 'email_change':
      subject = '修改邮箱验证码';
      text = `您的修改邮箱验证码是: ${code}，有效期为10分钟。`;
      break;
    default:
      subject = '验证码';
      text = `您的验证码是: ${code}，有效期为10分钟。`;
  }

  const mailOptions = {
    from: config.user,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};