import * as mongoose from 'mongoose';
const userSettingSchema = new mongoose.Schema({
    user_id: String,
    allow_location: Boolean,
    subscribe: Boolean,
    link_youtube_account: Boolean,
    two_step_verification: Boolean
});

const userSetting = mongoose.model('user_settings', userSettingSchema);

export default userSetting;