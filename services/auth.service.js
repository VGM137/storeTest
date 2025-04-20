const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config.js');

const UserService = require('./user.service.js');
const service = new UserService();

class AuthService {
  async getUser(credentials) {
    const { email, password } = credentials;
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid password');
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m'
    });
    return token;
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
      email: user.email
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m'
    });
    const link = `${config.frontendUrl}/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mailOptions = {
      from: config.smtp.user,
      to: user.email,
      subject: 'Password Recovery',
      text: 'Click the link to recover your password',
      html: `<b>Click the link to recover your password</b><br><a href="${link}">Recover Password</a>`
    };

    const rta = await this.sendMail(mailOptions);

    return rta
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      console.log('Payload:', payload);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'Password changed' };
    } catch (error) {
      console.log('Error:', error);
      throw boom.unauthorized();
    }
  }

  async sendMail(mailOptions) {
    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: true,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password
      }
    });

    let message = ''
    await transporter.sendMail(mailOptions, (error, info) => {
      message = error 
        ? message = `Error sending email: ${error}` 
        : message = `Email sent: ${info.response}`;
    });

    return {
      message: 'Recovery email sent'
    };
  }
}

module.exports = AuthService;