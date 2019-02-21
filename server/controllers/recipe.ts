import Recipe from '../models/recipe';
import RecipeIngredient from '../models/recipe_ingredient';
import BaseCtrl from './base';
var ip = require('ip');

export default class RecipeCtrl extends BaseCtrl {
    model = Recipe;

    getIp = (req, res) => {
        res.status(200).json({ ipAddress: ip.address() })
    }

    getRecipe = (req, res) => {
        try {
            this.model.findOne({ _id: req.params.id }, function (err, recipe) {

                RecipeIngredient.findOne({ recipe_id: recipe._id }, function (err, recipeIngredients) {

                    res.status(200).json({ recipe: recipe, recipeIngredients: recipeIngredients });
                })
            })

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

}
