"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https',
    apiKey: 'AIzaSyBgBGjzWp6fg9kx6afKTslJB8swrvtoUnM',
    formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
var GeoLocationCtrl = /** @class */ (function () {
    function GeoLocationCtrl() {
        var _this = this;
        this.getGoogleAddress = function (req, res) {
            _this.getGoogleAddress1({ lat: req.query.lat, lon: req.query.lng }, function (address) {
                res.json(address);
            });
        };
    }
    GeoLocationCtrl.prototype.getGoogleAddress1 = function (param, calback) {
        geocoder.reverse(param, function (err, res) {
            if (!res)
                calback({ error: err.message });
            calback(res);
        });
    };
    return GeoLocationCtrl;
}());
exports.default = GeoLocationCtrl;
//# sourceMappingURL=geo_location.js.map