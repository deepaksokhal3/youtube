var nodemailer = require('nodemailer');
var crypto = require('crypto');
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import Token from '../models/token';
abstract class BaseCtrl {
  abstract model: any;
  // Get all
  getAll = async (req, res) => {
    try {
      const docs = await this.model.find({});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Count all
  count = async (req, res) => {
    try {
      const count = await this.model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // // Insert
  // insert = async (req, res) => {
  //   try {
  //     const obj = await new this.model(req.body).save();

  //     var token = new Token({ _userId: obj._id, token: crypto.randomBytes(16).toString('hex') });
  //     // Save the verification token
  //     token.save(function (err) {
  //       if (err) { return res.status(500).send({ msg: err.message }); }

  //       // Send the email
  //       var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'eros.developer@gmail.com', pass: 'developer123' } });
  //       var mailOptions = { from: 'no-reply@eros.developer@gmail.com', to: obj.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
  //       transporter.sendMail(mailOptions, function (err) {
  //         if (err) { return res.status(500).send({ msg: err.message }); }
  //         res.status(200).send('A verification email has been sent to ' + obj.email + '.');
  //       });
  //     });
  //     res.status(201).json(obj);
  //   } catch (err) {
  //     return res.status(400).json({ error: err.message });
  //   }
  // }

  // Insert
  insertUser = async (req, res) => {
    try {
      let obj = await this.model.findOne({ email: req.body.email });
      if (obj == null) {
        const obj = await new this.model(req.body).save();

        var token = new Token({ _userId: obj._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }

          // Send the email
          var mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });

          var data = {
            from: 'Yumlish <info@gmail.com>',
            to: obj.email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
          };
          mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
        });
        res.status(201).json(obj);
      } else {
        return res.status(400).json({ error: 'email already exits!' });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }

  insertSocialUserData = async (req, res) => {
    try {
      let obj = await this.model.findOne({ social_token: req.body.social_token });
      if (obj == null) {
        obj = await new this.model(req.body).save();
      }
      const token = jwt.sign({ user: obj }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      res.status(201).json({ token: token, });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }

  // Insert
  insert = async (req, res) => {
    try {
      const obj = await new this.model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  get = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update by id
  update = async (req, res) => {
    try {
      await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete by id
  delete = async (req, res) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BaseCtrl;
