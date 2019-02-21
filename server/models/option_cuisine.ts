import * as mongoose from 'mongoose';
const optionCuisineSchema = new mongoose.Schema({
    name: String,
});

const option_cuisine = mongoose.model('option_cuisines', optionCuisineSchema);

export default option_cuisine;