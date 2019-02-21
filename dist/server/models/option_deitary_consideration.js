"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionDeitaryConsiderationSchema = new mongoose.Schema({
    name: String,
});
var option_deitary_consideration = mongoose.model('option_deitary_considerations', optionDeitaryConsiderationSchema);
exports.default = option_deitary_consideration;
//# sourceMappingURL=option_deitary_consideration.js.map