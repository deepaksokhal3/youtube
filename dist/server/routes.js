"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("./controllers/user");
var confirmToken_1 = require("./controllers/confirmToken");
var cuisine_1 = require("./controllers/cuisine");
var meal_1 = require("./controllers/meal");
var ingredient_1 = require("./controllers/ingredient");
var prepration_method_1 = require("./controllers/prepration_method");
var recipe_type_1 = require("./controllers/recipe_type");
var units_1 = require("./controllers/units");
var holiday_1 = require("./controllers/holiday");
var recipe_1 = require("./controllers/recipe");
var deitary_1 = require("./controllers/deitary");
var contact_1 = require("./controllers/contact");
var user_settings_1 = require("./controllers/user_settings");
var recipe_ingredients_1 = require("./controllers/recipe_ingredients");
var tags_1 = require("./controllers/tags");
var geo_location_1 = require("./controllers/geo_location");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var confirmTokenCtrl = new confirmToken_1.default();
    var cuisineCtrl = new cuisine_1.default();
    var mealCtrl = new meal_1.default();
    var ingredientCtrl = new ingredient_1.default();
    var preprationMethodCtrl = new prepration_method_1.default();
    var recipeTypeCtrl = new recipe_type_1.default();
    var unitsCtrl = new units_1.default();
    var recipeCtrl = new recipe_1.default();
    var holidayCtrl = new holiday_1.default();
    var deitaryCtrl = new deitary_1.default();
    var contactCtrl = new contact_1.default();
    var userSettingsCtrl = new user_settings_1.default();
    var recipeIngredientCtrl = new recipe_ingredients_1.default();
    var tagsCtrl = new tags_1.default();
    var geoLocationCtrl = new geo_location_1.default();
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insertUser);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    router.route('/socialuser').post(userCtrl.insertSocialUserData);
    router.route('/upload').post(userCtrl.uploadProfilePic);
    router.route('/changepassword').put(userCtrl.changePassword);
    // router.route('/upload').post(userCtrl.uploadProfilePic);
    router.route('/forget/').post(userCtrl.forget);
    router.route('/resetpassword/').post(userCtrl.confirmResetPassToken);
    router.route('/setpassword/').put(userCtrl.resetPassword);
    //verifing email 
    router.route('/confirmation/:id').post(confirmTokenCtrl.confirm);
    router.route('/youtubevideoinfo').post(confirmTokenCtrl.youtubeFn);
    //option field
    router.route('/cuisines').get(cuisineCtrl.getAll);
    router.route('/meals').get(mealCtrl.getAll);
    router.route('/recipeTypes').get(recipeTypeCtrl.getAll);
    router.route('/holidays').get(holidayCtrl.getAll);
    router.route('/preprationMethods').get(preprationMethodCtrl.getAll);
    router.route('/ingredient').get(ingredientCtrl.getAll);
    router.route('/units').get(unitsCtrl.getAll);
    router.route('/deitaries').get(deitaryCtrl.getAll);
    // Recipe controller
    router.route('/recipe').post(recipeCtrl.insert);
    router.route('/recipes').get(recipeCtrl.getAll);
    router.route('/recipe/:id').get(recipeCtrl.getRecipe);
    router.route('/recipe/:id').put(recipeCtrl.update);
    router.route('/recipe/:id').delete(recipeCtrl.delete);
    router.route('/ip').get(recipeCtrl.getIp);
    // Recipe Ingredients contral
    router.route('/recipeIngredient').post(recipeIngredientCtrl.insert);
    router.route('/recipeIngredient/:id').get(recipeIngredientCtrl.get);
    router.route('/recipeIngredient/:id').put(recipeIngredientCtrl.update);
    // Contact contral
    router.route('/send').post(contactCtrl.send);
    //User Profile Setting
    router.route('/userSetting').post(userSettingsCtrl.insert);
    router.route('/userSetting/:user_id').get(userSettingsCtrl.getUserSetting);
    router.route('/userSettings/:id').put(userSettingsCtrl.update);
    //Tags
    router.route('/tags').get(tagsCtrl.getAll);
    router.route('/googleAddress').get(geoLocationCtrl.getGoogleAddress);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map