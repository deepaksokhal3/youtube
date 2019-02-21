"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var recipe_1 = require("../models/recipe");
var recipe_ingredient_1 = require("../models/recipe_ingredient");
var base_1 = require("./base");
var ip = require('ip');
var RecipeCtrl = /** @class */ (function (_super) {
    __extends(RecipeCtrl, _super);
    function RecipeCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = recipe_1.default;
        _this.getIp = function (req, res) {
            res.status(200).json({ ipAddress: ip.address() });
        };
        _this.getRecipe = function (req, res) {
            try {
                _this.model.findOne({ _id: req.params.id }, function (err, recipe) {
                    recipe_ingredient_1.default.findOne({ recipe_id: recipe._id }, function (err, recipeIngredients) {
                        res.status(200).json({ recipe: recipe, recipeIngredients: recipeIngredients });
                    });
                });
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        };
        return _this;
    }
    return RecipeCtrl;
}(base_1.default));
exports.default = RecipeCtrl;
//# sourceMappingURL=recipe.js.map