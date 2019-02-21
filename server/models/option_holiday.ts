import * as mongoose from 'mongoose';

const optionHolidaySchema = new mongoose.Schema({
    name: String,
});

const option_holiday = mongoose.model('option_holidays', optionHolidaySchema);

export default option_holiday; 