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
var option_deitary_consideration_1 = require("../models/option_deitary_consideration");
var base_1 = require("./base");
var DeitaryCtrl = /** @class */ (function (_super) {
    __extends(DeitaryCtrl, _super);
    function DeitaryCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = option_deitary_consideration_1.default;
        return _this;
    }
    return DeitaryCtrl;
}(base_1.default));
exports.default = DeitaryCtrl;
//# sourceMappingURL=deitary.js.map