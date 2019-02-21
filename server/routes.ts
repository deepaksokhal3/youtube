import * as express from 'express';
import UserCtrl from './controllers/user';
import ConfirmTokenCtrl from './controllers/confirmToken';
import CuisineCtrl from './controllers/cuisine';
import MealCtrl from './controllers/meal';
import IngredientCtrl from './controllers/ingredient';
import PreprationMethodCtrl from './controllers/prepration_method';
import RecipeTypeCtrl from './controllers/recipe_type';
import UnitsCtrl from './controllers/units';
import HolidayCtrl from './controllers/holiday';
import RecipeCtrl from './controllers/recipe';
import DeitaryCtrl from './controllers/deitary';
import ContactCtrl from './controllers/contact';
import UserSettingsCtrl from './controllers/user_settings';
import RecipeIngredientCtrl from './controllers/recipe_ingredients';
import TagsCtrl from './controllers/tags';

import GeoLocationCtrl from './controllers/geo_location';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const confirmTokenCtrl = new ConfirmTokenCtrl();
  const cuisineCtrl = new CuisineCtrl();
  const mealCtrl = new MealCtrl();
  const ingredientCtrl = new IngredientCtrl();
  const preprationMethodCtrl = new PreprationMethodCtrl();
  const recipeTypeCtrl = new RecipeTypeCtrl();
  const unitsCtrl = new UnitsCtrl();
  const recipeCtrl = new RecipeCtrl();
  const holidayCtrl = new HolidayCtrl();
  const deitaryCtrl = new DeitaryCtrl();
  const contactCtrl = new ContactCtrl();
  const userSettingsCtrl = new UserSettingsCtrl();
  const recipeIngredientCtrl = new RecipeIngredientCtrl();
  const tagsCtrl = new TagsCtrl();

  const geoLocationCtrl = new GeoLocationCtrl();

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
