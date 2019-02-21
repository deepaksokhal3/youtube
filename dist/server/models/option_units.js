"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionUnitsSchema = new mongoose.Schema({
    name: String,
});
var option_units = mongoose.model('option_units', optionUnitsSchema);
exports.default = option_units;
//# sourceMappingURL=option_units.js.map