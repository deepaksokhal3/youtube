import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import Ingredient from '../models/option_ingredient';
import BaseCtrl from './base';

export default class IngredientCtrl extends BaseCtrl {
    model = Ingredient;
}