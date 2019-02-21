"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var accounts_1 = require("../models/accounts");
var user_settings_1 = require("../models/user_settings");
var base_1 = require("./base");
var fs = require("fs");
var strtotime = require('strtotime');
var UserCtrl = /** @class */ (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = accounts_1.default;
        _this.login = function (req, res) {
            _this.model.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                if (!user.email_verification_status)
                    return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    var OTP = Math.floor(1000 + Math.random() * 9000); // Genrate four digit otp 
                    try {
                        user_settings_1.default.findOne({ user_id: user._id }, function (err, setting) {
                            if (setting) {
                                if (setting.two_step_verification) {
                                    var mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });
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
                    }
                    catch (err) {
                        console.log(err);
                    }
                    res.status(200).json({ token: token, OTP: OTP });
                });
            });
        };
        _this.forget = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findOne({ email: req.body.email }, function (err, account) {
                            if (!account) {
                                return res.status(403).json(err.message);
                            }
                            var token = crypto.randomBytes(20).toString('hex');
                            account.resetPasswordToken = token;
                            account.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                            account.save(function (err) {
                                // Send the email
                                var mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });
                                var data = {
                                    from: 'Yumlish <info@gmail.com>',
                                    to: account.email,
                                    subject: 'Reset Password',
                                    text: 'Hello,\n\n' + 'Please reset you password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/resetpassword\/' + token + '.\n'
                                };
                                mailgun.messages().send(data, function (error, body) {
                                    if (!body) {
                                        return res.status(200).json(error.message);
                                    }
                                    res.status(200).json({ msg: 'Please check your email' });
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.confirmResetPassToken = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.model.findOne({ resetPasswordToken: req.body.token }, function (err, account) {
                    if (!account)
                        return res.status(400).send({ type: 'expire', msg: 'We were unable to find a valid token. Your token my have expired.' });
                    // If we found a token, find a matching user
                    res.status(200).json(account);
                });
                return [2 /*return*/];
            });
        }); };
        _this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findOne({ _id: req.body.id }, function (err, account) {
                            if (!account) {
                                return res.status(403).json(err.message);
                            }
                            account.password = req.body.password;
                            account.save(function (err, result) {
                                res.status(200).json({ msg: 'Password successfuly reset.' });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.uploadProfilePic = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var DIR, imageName, base64Data;
            return __generator(this, function (_a) {
                DIR = 'client/assets/images/';
                imageName = Date.now();
                base64Data = req.body.base64Image.replace(/^data:image\/png;base64,/, "");
                req.body.prifile_pic = DIR + imageName + ".png";
                try {
                    fs.writeFile(req.body.prifile_pic, base64Data, 'base64', function (err) {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        ;
                        res.status(200).json({ imageUrl: req.body.prifile_pic });
                    });
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
            });
        }); };
        _this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findOne({ _id: req.body._id }, function (err, user) {
                            if (!user) {
                                return res.sendStatus(403);
                            }
                            user.comparePassword(req.body.old, function (error, isMatch) {
                                if (!isMatch) {
                                    res.sendStatus(403).json({ error: 'old pasword not match' });
                                }
                                user.password = req.body.newPass;
                                user.save(function (err, result) {
                                    res.status(200).json({ msg: 'Password successfuly changed.' });
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map