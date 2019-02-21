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
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../models/token");
var accounts_1 = require("../models/accounts");
var base_1 = require("./base");
var fetchVideoInfo = require('youtube-info');
var getYouTubeID = require('get-youtube-id');
var ConfirmCtrl = /** @class */ (function (_super) {
    __extends(ConfirmCtrl, _super);
    function ConfirmCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = token_1.default;
        _this.youtubeFn = function (req, res) {
            try {
                fetchVideoInfo(getYouTubeID(req.body.url), function (err, videoInfo) {
                    if (err) {
                        return res.status(500).send({ error: err.message });
                    }
                    res.status(200).send(videoInfo);
                });
            }
            catch (err) {
                console.log(err.message);
                return res.status(400).json({ err: err.message });
            }
        };
        _this.confirm = function (req, res) {
            // Find a matching token
            _this.model.findOne({ token: req.body.token }, function (err, token) {
                if (!token)
                    return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
                // If we found a token, find a matching user
                accounts_1.default.findOne({ _id: token._userId }, function (err, user) {
                    if (!user)
                        return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                    if (user.isVerified)
                        return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
                    // Verify and save the user
                    user.email_verification_status = true;
                    user.status = 'verified';
                    user.save(function (err) {
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }
                        res.status(200).send("The account has been verified. Please log in.");
                        console.log('update');
                    });
                });
            });
        };
        return _this;
    }
    return ConfirmCtrl;
}(base_1.default));
exports.default = ConfirmCtrl;
//# sourceMappingURL=confirmToken.js.map