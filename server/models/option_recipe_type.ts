import * as mongoose from 'mongoose';


const optionRecipeTypeSchema = new mongoose.Schema({
    name: String,
});

const option_recipe_type = mongoose.model('option_recipe_types', optionRecipeTypeSchema);

export default option_recipe_type;