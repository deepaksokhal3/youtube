"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var routes_1 = require("./routes");
var app = express(), server = require('http').createServer(app);
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 9000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
var mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
}
else {
    mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}
mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI, { useNewUrlParser: true })
    .then(function (db) {
    routes_1.default(app);
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    if (!module.parent) {
        app.listen(app.get('port'), function () { return console.log("Angular listening on port " + app.get('port')); });
    }
})
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map