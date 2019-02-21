"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var userSettingSchema = new mongoose.Schema({
    user_id: String,
    allow_location: Boolean,
    subscribe: Boolean,
    link_youtube_account: Boolean,
    two_step_verification: Boolean
});
var userSetting = mongoose.model('user_settings', userSettingSchema);
exports.default = userSetting;
//# sourceMappingURL=user_settings.js.map