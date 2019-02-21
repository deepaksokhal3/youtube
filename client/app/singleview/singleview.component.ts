import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser'
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.scss']
})
export class SingleviewComponent implements OnInit {
  recipe;
  isLoading = true;
  constructor(public toast: ToastComponent,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private embedService: EmbedVideoService,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipe();
  }

  encodeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getRecipe() {
    this.recipeService.getRecipe(this.route.params['value'].id).subscribe(
      data => {
        this.recipe = data.recipe
        this.recipe.videolink = this.embedService.embed(this.recipe.youtube_link);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
