import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const optionMealSchema = new mongoose.Schema({
    name: String,
});

const Meal = mongoose.model('option_meals', optionMealSchema);

export default Meal;