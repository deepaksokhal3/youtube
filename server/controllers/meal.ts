import Meal from '../models/option_meal';
import BaseCtrl from './base';

export default class MealCtrl extends BaseCtrl {
    model = Meal;

    // getMeals = (req, res) => {
    //     console.log(req);
    //     this.model.find((err, meal) => {
    //         if (!meal) { return res.sendStatus(403); }
    //         res.status(200).json(meal);
    //     });
    // }
}