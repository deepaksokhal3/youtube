import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
var crypto = require('crypto');
var nodemailer = require('nodemailer');
import Account from '../models/accounts';
import UserSetting from '../models/user_settings';
import BaseCtrl from './base';
const fs = require("fs");
const strtotime = require('strtotime');

export default class UserCtrl extends BaseCtrl {
  model = Account;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      if (!user.email_verification_status) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        let OTP = Math.floor(1000 + Math.random() * 9000); // Genrate four digit otp 
        try {
          UserSetting.findOne({ user_id: user._id }, (err, setting) => {
            if (setting) {
              if (setting.two_step_verification) {
                let mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });
                var data = {
                  from: 'Yumlish <info@gmail.com>',
                  to: req.body.email,
                  subject: 'Yumlish Login Security',
                  text: 'Hello,\n\n' + 'Please verify you login account.The OTP is ' + OTP
                };
                mailgun.messages().send(data, function (error, body) {
                });
              }
            }
          });
        } catch (err) {
          console.log(err)
        }
        res.status(200).json({ token: token, OTP: OTP });
      });
    });
  }

  forget = async (req, res) => {
    await this.model.findOne({ email: req.body.email }, function (err, account) {
      if (!account) { return res.status(403).json(err.message); }
      let token = crypto.randomBytes(20).toString('hex');
      account.resetPasswordToken = token;
      account.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      account.save(function (err) {

        // Send the email
        let mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });

        var data = {
          from: 'Yumlish <info@gmail.com>',
          to: account.email,
          subject: 'Reset Password',
          text: 'Hello,\n\n' + 'Please reset you password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/resetpassword\/' + token + '.\n'
        };
        mailgun.messages().send(data, function (error, body) {
          if (!body) { return res.status(200).json(error.message); }
          res.status(200).json({ msg: 'Please check your email' });
        });
      });
    });
  }

  confirmResetPassToken = async (req, res) => {

    this.model.findOne({ resetPasswordToken: req.body.token }, function (err, account) {
      if (!account) return res.status(400).send({ type: 'expire', msg: 'We were unable to find a valid token. Your token my have expired.' });
      // If we found a token, find a matching user
      res.status(200).json(account);
    });
  }

  resetPassword = async (req, res) => {
    await this.model.findOne({ _id: req.body.id }, function (err, account) {
      if (!account) { return res.status(403).json(err.message); }
      account.password = req.body.password;
      account.save(function (err, result) {
        res.status(200).json({ msg: 'Password successfuly reset.' });
      });
    });

  }
  uploadProfilePic = async (req, res) => {
    let DIR = 'client/assets/images/';
    let imageName = Date.now();
    var base64Data = req.body.base64Image.replace(/^data:image\/png;base64,/, "");
    req.body.prifile_pic = DIR + imageName + ".png";
    try {
      fs.writeFile(req.body.prifile_pic, base64Data, 'base64', function (err) {
        if (err) { return res.status(500).json({ error: err.message }) };
        res.status(200).json({ imageUrl: req.body.prifile_pic });
      });
    } catch (err) {
      console.log(err);
    }
  }

  changePassword = async (req, res) => {
    await this.model.findOne({ _id: req.body._id }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.old, (error, isMatch) => {
        if (!isMatch) { res.sendStatus(403).json({ error: 'old pasword not match' }); }
        user.password = req.body.newPass;
        user.save(function (err, result) {
          res.status(200).json({ msg: 'Password successfuly changed.' });
        });
      });
    });
  }


}
