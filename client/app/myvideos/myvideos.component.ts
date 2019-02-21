import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { EmbedVideoService } from 'ngx-embed-video';


@Component({
  selector: 'app-myvideos',
  templateUrl: './myvideos.component.html',
  styleUrls: ['./myvideos.component.scss']
})
export class MyvideosComponent implements OnInit {
  recipes;
  isLoading = false;
  urlVideo: String;

  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    private embedService: EmbedVideoService,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(
      data => {
        this.recipes = data;
        for (var i = 0; i < this.recipes.length; i++) {
          this.recipes[i].videolink = this.embedService.embed(this.recipes[i].youtube_link)
          console.log(this.recipes[i].videolink)
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  addNewRecipe() {
    this.router.navigate(['/addyoutubevideo']);
  }

  deleteRecipe(recipe) {
    if (window.confirm('Are you sure you want to permanently delete this video?')) {
      this.recipeService.deleteRecipe(recipe).subscribe(
        () => {
          const pos = this.recipes.map(elem => elem._id).indexOf(recipe._id);
          this.recipes.splice(pos, 1);
          this.toast.setMessage('video deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
