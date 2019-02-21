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
var option_meal_1 = require("../models/option_meal");
var base_1 = require("./base");
var MealCtrl = /** @class */ (function (_super) {
    __extends(MealCtrl, _super);
    function MealCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = option_meal_1.default;
        return _this;
        // getMeals = (req, res) => {
        //     console.log(req);
        //     this.model.find((err, meal) => {
        //         if (!meal) { return res.sendStatus(403); }
        //         res.status(200).json(meal);
        //     });
        // }
    }
    return MealCtrl;
}(base_1.default));
exports.default = MealCtrl;
//# sourceMappingURL=meal.js.map