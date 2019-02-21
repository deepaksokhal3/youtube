"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionIngredientSchema = new mongoose.Schema({
    name: String,
});
var option_ingredient = mongoose.model('option_ingredients', optionIngredientSchema);
exports.default = option_ingredient;
//# sourceMappingURL=option_ingredient.js.map