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
var option_cuisine_1 = require("../models/option_cuisine");
var base_1 = require("./base");
var CuisineCtrl = /** @class */ (function (_super) {
    __extends(CuisineCtrl, _super);
    function CuisineCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = option_cuisine_1.default;
        return _this;
    }
    return CuisineCtrl;
}(base_1.default));
exports.default = CuisineCtrl;
//# sourceMappingURL=cuisine.js.map