"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var ContactCtrl = /** @class */ (function () {
    function ContactCtrl() {
        // Send the email
        this.send = function (req, res) {
            console.log(req.body);
            var api_key = 'key-6db0a6d81058dee81621980d0cf376db';
            var domain = 'mg.upkepr.com';
            var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
            var data = {
                from: 'Yumlish <info@gmail.com>',
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.description
            };
            mailgun.messages().send(data, function (error, body) {
                if (error)
                    return res.sendStatus(403).json(error);
                res.status(200).json(body);
            });
        };
    }
    return ContactCtrl;
}());
exports.default = ContactCtrl;
//# sourceMappingURL=contact.js.map