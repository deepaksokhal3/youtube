"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionCuisineSchema = new mongoose.Schema({
    name: String,
});
var option_cuisine = mongoose.model('option_cuisines', optionCuisineSchema);
exports.default = option_cuisine;
//# sourceMappingURL=option_cuisine.js.map