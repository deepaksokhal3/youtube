import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuisines } from '../shared/models/option_cuisine';
import { Holiday } from '../shared/models/option_holiday';
import { Ingredient } from '../shared/models/option_ingredient.models';
import { Meal } from '../shared/models/meal';
import { PreprationMethod } from '../shared/models/option_prepration_method';
import { RecipeType } from '../shared/models/option_recipe_type';
import { Units } from '../shared/models/option_units';
import { Deitary } from '../shared/models/option_deitary_consideration';
import { Tags } from '../shared/models/option_tags';

@Injectable()
export class OptionsService {

    constructor(private http: HttpClient) { }

    getCuisines(): Observable<Cuisines[]> {
        return this.http.get<Cuisines[]>('/api/cuisines');
    }

    getHolidays(): Observable<Holiday[]> {
        return this.http.get<Holiday[]>('/api/holidays');
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('/api/ingredient');
    }

    getMeals(): Observable<Meal[]> {
        return this.http.get<Meal[]>('/api/meals');
    }

    getPreprationMethods(): Observable<PreprationMethod[]> {
        return this.http.get<PreprationMethod[]>('/api/preprationMethods');
    }

    getRecipeTypes(): Observable<RecipeType[]> {
        return this.http.get<RecipeType[]>('/api/recipeTypes');
    }

    getUnits(): Observable<Units[]> {
        return this.http.get<Units[]>('/api/units');
    }

    getDeitarys(): Observable<Deitary[]> {
        return this.http.get<Deitary[]>('/api/deitaries');
    }

    getTags(): Observable<Tags[]> {
        return this.http.get<Tags[]>('/api/tags');
    }
}