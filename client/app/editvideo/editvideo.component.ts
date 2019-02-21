import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { VideoService } from '../services/video.service';
import { OptionsService } from '../services/options.service';
import { Recipe } from '../shared/models/recipe.model';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RecipeService } from '../services/recipe.service';
@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrls: ['./editvideo.component.scss']
})
export class EditvideoComponent implements OnInit {
  recipe = new Recipe();
  recipes: Recipe[] = [];
  isLoading = false;



  unitsList = [];
  selectedunits = [];
  unitsDropdownSettings = {};

  cuisinesList = [];
  selectedCuisines = [];
  cuisineDropdownSettings = {};

  mainIngredientsList = [];
  selectedMainIngredients = [];
  mainIngredientDropdownSettings = {};

  recipeTypesList = [];
  selectedRecipeTypes = [];
  recipeTypeDropdownSettings = {};

  mealsList = [];
  selectedMeals = [];
  mealDropdownSettings = {};

  preparationMethodsList = [];
  selectedPreparations = [];
  preparationMethodDropdownSettings = {};

  dietarysList = [];
  selectedDietarys = [];
  dietaryDropdownSettings = {};


  holidaysList = [];
  selectedHolidays = [];
  holidayDropdownSettings = {};

  ingredientForm: FormGroup;
  ingredientMultForm: FormGroup

  ingredient_name = new FormControl('', Validators.required);
  quantities = new FormControl('', Validators.required);
  units = new FormControl('', Validators.required);

  editRecipeigredientId;
  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private optionService: OptionsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.enableEditing();
    this.getHolidays();
    this.getIngredients();
    this.getMeals();
    this.getPreprationMethods();
    this.getRecipeTypes();
    this.getUnits();
    this.getCuisines();
    this.getDeitarys();
    this.unitsDropdownSettings = this.holidayDropdownSettings = this.mainIngredientDropdownSettings = this.cuisineDropdownSettings = this.dietaryDropdownSettings = this.preparationMethodDropdownSettings = this.mealDropdownSettings = this.recipeTypeDropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };


    this.ingredientForm = this.formBuilder.group({
      ingredient_name: this.ingredient_name,
      quantities: this.quantities,
      units: this.units,
    });

    this.ingredientMultForm = this.formBuilder.group({
      rows: this.formBuilder.array([])
    });

  }


  getIp() {
    this.recipeService.getIp().subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }


  // Save ingredients in db
  saveRecipeIngredient(recipeId) {
    if (this.ingredientMultForm.valid) {
      this.ingredientMultForm.value.recipe_id = recipeId;
      this.ingredientMultForm.value.rows = JSON.stringify(this.ingredientMultForm.value.rows);
      this.ingredientMultForm.value._id = this.editRecipeigredientId;
      this.recipeService.editRecipeIngredient(this.ingredientMultForm.value).subscribe(
        res => console.log(res),
        error => console.log(error)
      );
    } else {
      this.toast.setMessage('Please set ingredients.', 'danger');
    }
  }

  setOptionValues(recipe) {
    recipe.main_ingredients = JSON.stringify(this.selectedMainIngredients);
    recipe.serving_units = JSON.stringify(this.selectedunits);
    recipe.cuisine = JSON.stringify(this.selectedCuisines);
    recipe.type_of_recipe = JSON.stringify(this.selectedRecipeTypes);
    recipe.meal = JSON.stringify(this.selectedMeals);
    recipe.preparation_method = JSON.stringify(this.selectedPreparations);
    recipe.dietary_consideration = JSON.stringify(this.selectedDietarys);
    recipe.holiday = JSON.stringify(this.selectedHolidays);
  }
  edit(recipe: Recipe) {
    this.setOptionValues(recipe);
    this.recipeService.editRecipe(recipe).subscribe(
      () => {
        this.saveRecipeIngredient(recipe._id);
        this.recipe = recipe;
        this.toast.setMessage('ecipe edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  // push ingredients data in buffer 
  saveIngredient() {
    if (this.ingredientForm.valid) {
      const control = new FormGroup({
        'ingredientName': new FormControl(this.ingredientForm.value.ingredient_name),
        'qty': new FormControl(this.ingredientForm.value.quantities),
        'unit': new FormControl(this.ingredientForm.value.units)
      });
      (<FormArray>this.ingredientMultForm.get('rows')).push(control);
      this.ingredientForm.reset();
    }
  }
  enableEditing() {
    this.getIp();
    this.recipeService.getRecipe(this.route.params['value'].id).subscribe(
      data => {
        this.recipe = data.recipe;
        this.editRecipeigredientId = data.recipeIngredients._id;
        let recipeIngredients = JSON.parse(data.recipeIngredients.rows);
        for (let i = 0; i < recipeIngredients.length; i++) {
          const control = new FormGroup({
            'ingredientName': new FormControl(recipeIngredients[i].ingredientName),
            'qty': new FormControl(recipeIngredients[i].qty),
            'unit': new FormControl(recipeIngredients[i].unit)
          });
          (<FormArray>this.ingredientMultForm.get('rows')).push(control);
        }

        try {
          this.selectedunits = JSON.parse(data.recipe.serving_units);
          this.selectedCuisines = JSON.parse(data.recipe.cuisine);
          this.selectedMainIngredients = JSON.parse(data.recipe.main_ingredients);
          this.selectedRecipeTypes = JSON.parse(data.recipe.type_of_recipe);
          this.selectedMeals = JSON.parse(data.recipe.meal);
          this.selectedPreparations = JSON.parse(data.recipe.preparation_method);
          this.selectedDietarys = JSON.parse(data.recipe.dietary_consideration);
          this.selectedHolidays = JSON.parse(data.recipe.holiday);
        } catch (e) {

        }
      },
      error => console.log(error)
    );
  }

  getCuisines() {
    this.optionService.getCuisines().subscribe(
      data => this.cuisinesList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getHolidays() {
    this.optionService.getHolidays().subscribe(
      data => this.holidaysList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getIngredients() {
    this.optionService.getIngredients().subscribe(
      data => this.mainIngredientsList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getMeals() {
    this.optionService.getMeals().subscribe(
      data => this.mealsList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getPreprationMethods() {
    this.optionService.getPreprationMethods().subscribe(
      data => this.preparationMethodsList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getRecipeTypes() {
    this.optionService.getRecipeTypes().subscribe(
      data => this.recipeTypesList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getUnits() {
    this.optionService.getUnits().subscribe(
      data => this.unitsList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getDeitarys() {
    this.optionService.getDeitarys().subscribe(
      data => this.dietarysList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  placeVideoId(e) {
    this.isLoading = true
    this.videoService.getVideoInfo(e.target.value).subscribe(
      data => this.setYouTubleData(data),
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  setYouTubleData(YouTube: any) {
    try {
      this.recipe.youtuble_embed_url = YouTube.embedURL;
      this.recipe.title = YouTube.title;
      this.recipe.youtube_video_id = YouTube.videoId;
      this.recipe.youtube_total_comments = YouTube.commentCount;
      this.recipe.youtube_publisher_name = YouTube.owner;
      this.recipe.youtube_publish_date = YouTube.datePublished;
      this.recipe.description = YouTube.description.replace(/<br\s*[\/]?>/gi, '\n');
    } catch (err) {
      console.log(err.message);
    }
  }

}
