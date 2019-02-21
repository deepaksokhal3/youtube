import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import Token from '../models/token';
import Account from '../models/accounts';
import BaseCtrl from './base';
const fetchVideoInfo = require('youtube-info');
const getYouTubeID = require('get-youtube-id');

export default class ConfirmCtrl extends BaseCtrl {
    model = Token;
    youtubeFn = (req, res) => {
        try {
            fetchVideoInfo(getYouTubeID(req.body.url), function (err, videoInfo) {
                if (err) { return res.status(500).send({ error: err.message }); }
                res.status(200).send(videoInfo);
            });
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({ err: err.message });
        }
    }
    confirm = (req, res) => {
        // Find a matching token
        this.model.findOne({ token: req.body.token }, function (err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
            // If we found a token, find a matching user

            Account.findOne({ _id: token._userId }, function (err, user) {
                if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

                // Verify and save the user
                user.email_verification_status = true;
                user.status = 'verified';
                user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send("The account has been verified. Please log in.");
                    console.log('update');
                });
            });
        });
    }

}
