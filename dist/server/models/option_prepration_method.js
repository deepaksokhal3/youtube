"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionPreprationMethodSchema = new mongoose.Schema({
    name: String,
});
var option_prepration_method = mongoose.model('option_prepration_methods', optionPreprationMethodSchema);
exports.default = option_prepration_method;
//# sourceMappingURL=option_prepration_method.js.map