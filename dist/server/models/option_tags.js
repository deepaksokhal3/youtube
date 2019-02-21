"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionTagSchema = new mongoose.Schema({
    name: String,
});
var option_tags = mongoose.model('option_tags', optionTagSchema);
exports.default = option_tags;
//# sourceMappingURL=option_tags.js.map