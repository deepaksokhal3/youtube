import * as mongoose from 'mongoose';
const recipeSchema = new mongoose.Schema({
    recipe_id: String,
    rows: String,
});
const recipe_ingredient = mongoose.model('recipe_ingredients', recipeSchema);

export default recipe_ingredient; 