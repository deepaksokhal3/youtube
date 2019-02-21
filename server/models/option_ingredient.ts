import * as mongoose from 'mongoose';

const optionIngredientSchema = new mongoose.Schema({
  name: String,
});

const option_ingredient = mongoose.model('option_ingredients', optionIngredientSchema);

export default option_ingredient;
