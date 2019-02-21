"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var optionRecipeTypeSchema = new mongoose.Schema({
    name: String,
});
var option_recipe_type = mongoose.model('option_recipe_types', optionRecipeTypeSchema);
exports.default = option_recipe_type;
//# sourceMappingURL=option_recipe_type.js.map