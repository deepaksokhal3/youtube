import * as mongoose from 'mongoose';
const optionDeitaryConsiderationSchema = new mongoose.Schema({
    name: String,
});

const option_deitary_consideration = mongoose.model('option_deitary_considerations', optionDeitaryConsiderationSchema);

export default option_deitary_consideration;