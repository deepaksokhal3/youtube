"use strict";
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
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var token_1 = require("../models/token");
var BaseCtrl = /** @class */ (function () {
    function BaseCtrl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var docs, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({})];
                    case 1:
                        docs = _a.sent();
                        res.status(200).json(docs);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Count all
        this.count = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var count, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.count()];
                    case 1:
                        count = _a.sent();
                        res.status(200).json(count);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
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
        this.insertUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj, obj_1, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.model.findOne({ email: req.body.email })];
                    case 1:
                        obj = _a.sent();
                        if (!(obj == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new this.model(req.body).save()];
                    case 2:
                        obj_1 = _a.sent();
                        token = new token_1.default({ _userId: obj_1._id, token: crypto.randomBytes(16).toString('hex') });
                        // Save the verification token
                        token.save(function (err) {
                            if (err) {
                                return res.status(500).send({ msg: err.message });
                            }
                            // Send the email
                            var mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN });
                            var data = {
                                from: 'Yumlish <info@gmail.com>',
                                to: obj_1.email,
                                subject: 'Account Verification Token',
                                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
                            };
                            mailgun.messages().send(data, function (error, body) {
                                console.log(body);
                            });
                        });
                        res.status(201).json(obj_1);
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(400).json({ error: 'email already exits!' })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3.message);
                        return [2 /*return*/, res.status(400).json({ error: err_3.message })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.insertSocialUserData = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj, token, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.model.findOne({ social_token: req.body.social_token })];
                    case 1:
                        obj = _a.sent();
                        if (!(obj == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new this.model(req.body).save()];
                    case 2:
                        obj = _a.sent();
                        _a.label = 3;
                    case 3:
                        token = jwt.sign({ user: obj }, process.env.SECRET_TOKEN);
                        res.status(201).json({ token: token, });
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        console.log(err_4.message);
                        return [2 /*return*/, res.status(400).json({ error: err_4.message })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // Insert
        this.insert = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new this.model(req.body).save()];
                    case 1:
                        obj = _a.sent();
                        res.status(201).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5.message);
                        return [2 /*return*/, res.status(400).json({ error: err_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get by id
        this.get = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ _id: req.params.id })];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_6.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Update by id
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: req.params.id }, req.body)];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_7.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Delete by id
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndRemove({ _id: req.params.id })];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_8.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return BaseCtrl;
}());
exports.default = BaseCtrl;
//# sourceMappingURL=base.js.map