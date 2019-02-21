
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBgBGjzWp6fg9kx6afKTslJB8swrvtoUnM', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
export default class GeoLocationCtrl {
    getGoogleAddress = (req, res) => {
        this.getGoogleAddress1({ lat: req.query.lat, lon: req.query.lng }, function (address) {
            res.json(address);
        })
    }

    getGoogleAddress1(param, calback) {
        geocoder.reverse(param, function (err, res) {
            if (!res) calback({ error: err.message });
            calback(res);
        });
    }
}