import * as mongoose from 'mongoose';
const optionUnitsSchema = new mongoose.Schema({
    name: String,
});

const option_units = mongoose.model('option_units', optionUnitsSchema);

export default option_units;