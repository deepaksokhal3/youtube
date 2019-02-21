import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeIngredient } from '../shared/models/recipe_ingredient.model';

@Injectable()
export class RecipeService {

    constructor(private http: HttpClient) { }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>('/api/recipe', recipe);
    }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>('/api/recipes');
    }
    editRecipe(recipe: Recipe): Observable<any> {
        return this.http.put(`/api/recipe/${recipe._id}`, recipe, { responseType: 'text' });
    }
    getRecipe(recipe: Recipe): Observable<any> {
        return this.http.get<any>(`/api/recipe/${recipe}`);
    }

    getIp(): Observable<any> {
        return this.http.get<any>(`/api/ip`);
    }

    deleteRecipe(recipe: Recipe): Observable<any> {
        return this.http.delete(`/api/recipe/${recipe._id}`, { responseType: 'text' });
    }
    // Recipe Ingredient Contral
    addRecipeIngredient(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
        return this.http.post<RecipeIngredient>('/api/recipeIngredient', recipeIngredient);
    }
    editRecipeIngredient(recipeIngredient: RecipeIngredient): Observable<any> {
        return this.http.put(`/api/recipeIngredient/${recipeIngredient._id}`, recipeIngredient, { responseType: 'text' });
    }



}
