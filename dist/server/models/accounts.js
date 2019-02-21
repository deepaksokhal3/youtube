"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var accountsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    dob: String,
    username: String,
    email: { type: String, lowercase: true, trim: true },
    email_verification_status: Boolean,
    status: { type: String, default: 'not_verified' },
    password: String,
    phone_number: String,
    regster_ip: String,
    last_update_ip: String,
    country: String,
    state: String,
    city: String,
    prifile_pic: String,
    zip_code: String,
    provider: String,
    tags: String,
    social_token: { type: String },
    role: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
// Before saving the user, hash the password
accountsSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
accountsSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Omit the password when returning a user
accountsSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
var Accounts = mongoose.model('accounts', accountsSchema);
exports.default = Accounts;
//# sourceMappingURL=accounts.js.map