import UserSettings from '../models/user_settings';
import BaseCtrl from './base';

export default class UserSettingsCtrl extends BaseCtrl {
    model = UserSettings;


    getUserSetting = async (req, res) => {
        try {
            const obj = await this.model.findOne({ user_id: req.params.user_id });
            res.status(200).json(obj);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
