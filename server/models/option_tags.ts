import * as mongoose from 'mongoose';
const optionTagSchema = new mongoose.Schema({
    name: String,
});

const option_tags = mongoose.model('option_tags', optionTagSchema);

export default option_tags;