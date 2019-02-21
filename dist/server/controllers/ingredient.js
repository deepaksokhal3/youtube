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
var option_ingredient_1 = require("../models/option_ingredient");
var base_1 = require("./base");
var IngredientCtrl = /** @class */ (function (_super) {
    __extends(IngredientCtrl, _super);
    function IngredientCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = option_ingredient_1.default;
        return _this;
    }
    return IngredientCtrl;
}(base_1.default));
exports.default = IngredientCtrl;
//# sourceMappingURL=ingredient.js.map