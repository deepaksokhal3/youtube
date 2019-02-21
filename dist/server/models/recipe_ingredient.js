"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var recipeSchema = new mongoose.Schema({
    recipe_id: String,
    rows: String,
});
var recipe_ingredient = mongoose.model('recipe_ingredients', recipeSchema);
exports.default = recipe_ingredient;
//# sourceMappingURL=recipe_ingredient.js.map