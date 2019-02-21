import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { VideoService } from '../services/video.service';
import { OptionsService } from '../services/options.service';
import { Recipe } from '../shared/models/recipe.model';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-addyoutubevideos',
  templateUrl: './addyoutubevideos.component.html',
  styleUrls: ['./addyoutubevideos.component.scss']
})
export class AddyoutubevideosComponent implements OnInit {
  recipe = new Recipe();
  recipes: Recipe[] = [];
  isLoading = false;
  ingredients = [];
  unitsList = [];
  unitsDropdownSettings = {};

  cuisinesList = [];
  cuisineDropdownSettings = {};

  mainIngredientsList = [];
  mainIngredientDropdownSettings = {};

  recipeTypesList = [];
  recipeTypeDropdownSettings = {};

  mealsList = [];
  mealDropdownSettings = {};

  preparationMethodsList = [];
  preparationMethodDropdownSettings = {};

  dietarysList = [];
  dietaryDropdownSettings = {};


  holidaysList = [];
  holidayDropdownSettings = {};


  recipeForm: FormGroup;
  ingredientForm: FormGroup;
  ingredientMultForm: FormGroup
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  service_quantity = new FormControl('', Validators.required);
  serving_units = new FormControl('', []);
  preparation_time = new FormControl('', Validators.required);
  cuisine = new FormControl('', []);
  main_ingredients = new FormControl('', []);
  type_of_recipe = new FormControl('', []);
  meal = new FormControl('', []);
  preparation_method = new FormControl('', []);
  dietary_consideration = new FormControl('', []);
  video_type = new FormControl('', []);
  manuel_rating = new FormControl('', []);
  youtube_link = new FormControl('', Validators.required);
  youtube_rating = new FormControl('', []);
  youtube_video_id = new FormControl('', []);
  youtube_total_comments = new FormControl('', []);
  youtube_publisher_name = new FormControl('', []);
  youtube_publish_date = new FormControl('', []);
  youtube_original_data = new FormControl('', []);
  youtuble_embed_url = new FormControl('', []);
  created_ip = new FormControl('', []);
  last_update_ip = new FormControl('', []);
  holiday = new FormControl('', []);
  account_id = new FormControl('', Validators.required);

  cuisines = new FormControl('', []);
  serving_unitss = new FormControl('', []);
  main_ingredientss = new FormControl('', []);
  type_of_recipes = new FormControl('', []);
  meals = new FormControl('', []);
  preparation_methods = new FormControl('', []);
  dietary_considerations = new FormControl('', []);
  holidays = new FormControl('', []);


  ingredient_name = new FormControl('', Validators.required);
  quantities = new FormControl('', Validators.required);
  units = new FormControl('', Validators.required);


  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    private videoService: VideoService,
    private formBuilder: FormBuilder,
    private optionService: OptionsService,
    private recipeService: RecipeService) { }

  ngOnInit() {
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
    this.recipeForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      service_quantity: this.service_quantity,
      serving_units: this.serving_units,
      preparation_time: this.preparation_time,
      cuisine: this.cuisine,
      main_ingredients: this.main_ingredients,
      type_of_recipe: this.type_of_recipe,
      meal: this.meal,
      preparation_method: this.preparation_method,
      dietary_consideration: this.dietary_consideration,
      video_type: this.video_type,
      youtube_link: this.youtube_link,
      youtube_video_id: this.youtube_video_id,
      manuel_rating: this.manuel_rating,
      youtuble_embed_url: this.youtuble_embed_url,
      youtube_rating: this.youtube_rating,
      youtube_total_comments: this.youtube_total_comments,
      youtube_publisher_name: this.youtube_publisher_name,
      youtube_publish_date: this.youtube_publish_date,
      youtube_original_data: this.youtube_original_data,
      created_ip: this.created_ip,
      last_update_ip: this.last_update_ip,
      holiday: this.holiday,
      account_id: this.account_id,

      cuisines: this.cuisines,
      serving_unitss: this.serving_unitss,
      main_ingredientss: this.main_ingredientss,
      type_of_recipes: this.type_of_recipes,
      meals: this.meals,
      preparation_methods: this.preparation_methods,
      dietary_considerations: this.dietary_considerations,
      holidays: this.holidays

    });

    this.ingredientForm = this.formBuilder.group({
      ingredient_name: this.ingredient_name,
      quantities: this.quantities,
      units: this.units,
    });

    this.ingredientMultForm = this.formBuilder.group({
      rows: this.formBuilder.array([])
    });

    this.getIp();
  }

  // Save ingredients in db
  saveRecipeIngredient(recipeId) {
    if (this.ingredientMultForm.valid) {
      this.ingredientMultForm.value.recipe_id = recipeId;
      this.ingredientMultForm.value.rows = JSON.stringify(this.ingredientMultForm.value.rows);
      this.recipeService.addRecipeIngredient(this.ingredientMultForm.value).subscribe(
        res => console.log(res),
        error => console.log(error)
      );
    } else {
      this.toast.setMessage('Please set ingredients.', 'danger');
    }
  }

  // save recipe 
  save() {
    this.setDropdownValues();
    this.recipeForm.controls['account_id'].setValue(this.auth.currentUser._id);
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(
        res => {
          this.saveRecipeIngredient(res._id);
          // this.recipeForm.reset();

          // http://localhost:4200/myvideos
          this.toast.setMessage('Recipe added successfully.', 'success');
        },
        error => console.log(error)
      );
    } else {
      this.toast.setMessage('Please fill all fields.', 'danger');
    }
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
      this.ingredients.push(this.ingredientForm.value)
      this.ingredientForm.reset();
    }
  }


  setDropdownValues() {
    this.recipeForm.controls['main_ingredients'].setValue(JSON.stringify(this.recipeForm.value.main_ingredientss));
    this.recipeForm.controls['serving_units'].setValue(JSON.stringify(this.recipeForm.value.serving_unitss));
    this.recipeForm.controls['cuisine'].setValue(JSON.stringify(this.recipeForm.value.cuisines));
    this.recipeForm.controls['type_of_recipe'].setValue(JSON.stringify(this.recipeForm.value.type_of_recipes));
    this.recipeForm.controls['meal'].setValue(JSON.stringify(this.recipeForm.value.meals));
    this.recipeForm.controls['preparation_method'].setValue(JSON.stringify(this.recipeForm.value.preparation_methods));
    this.recipeForm.controls['dietary_consideration'].setValue(JSON.stringify(this.recipeForm.value.dietary_considerations));
    this.recipeForm.controls['holiday'].setValue(JSON.stringify(this.recipeForm.value.holidays));
  }

  getIp() {
    this.recipeService.getIp().subscribe(
      data => {
        this.recipeForm.controls['created_ip'].setValue(data.ipAddress)
      },
      error => console.log(error)
    );
  }
  ;
  onItemSelect(e) {

  }
  onSelectAll(e) { }

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

    try {
      this.isLoading = true
      this.videoService.getVideoInfo(e.target.value).subscribe(
        data => { this.setYouTubleData(data) },
        error => {
          this.isLoading = false;
          this.toast.setMessage(error.error.err, 'danger');
        },
        () => this.isLoading = false
      );
    } catch (err) {
      this.isLoading = false
      this.toast.setMessage(err.message, 'danger');
    }
  }

  setYouTubleData(YouTube: any) {
    try {
      this.recipeForm.controls['youtuble_embed_url'].setValue(YouTube.embedURL);
      this.recipeForm.controls['title'].setValue(YouTube.title);
      this.recipeForm.controls['youtube_video_id'].setValue(YouTube.videoId);
      this.recipeForm.controls['youtube_total_comments'].setValue(YouTube.commentCount);
      this.recipeForm.controls['youtube_publisher_name'].setValue(YouTube.owner);
      this.recipeForm.controls['youtube_publish_date'].setValue(YouTube.datePublished);
      this.recipeForm.controls['description'].setValue(YouTube.description.replace(/<br\s*[\/]?>/gi, '\n'));
    } catch (err) {
      console.log(err.message);
    }
  }

}
