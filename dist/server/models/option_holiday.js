"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionHolidaySchema = new mongoose.Schema({
    name: String,
});
var option_holiday = mongoose.model('option_holidays', optionHolidaySchema);
exports.default = option_holiday;
//# sourceMappingURL=option_holiday.js.map