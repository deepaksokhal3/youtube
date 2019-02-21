"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionMealSchema = new mongoose.Schema({
    name: String,
});
var Meal = mongoose.model('option_meals', optionMealSchema);
exports.default = Meal;
//# sourceMappingURL=option_meal.js.map