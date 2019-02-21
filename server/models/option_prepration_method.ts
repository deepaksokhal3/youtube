import * as mongoose from 'mongoose';


const optionPreprationMethodSchema = new mongoose.Schema({
    name: String,
});

const option_prepration_method = mongoose.model('option_prepration_methods', optionPreprationMethodSchema);

export default option_prepration_method;