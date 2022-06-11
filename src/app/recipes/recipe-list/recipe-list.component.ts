import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg'
    ),
    new Recipe(
      'A Test Recipe',
      'This is smply a test',
      'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg'
    ),
  ];

  constructor() {}
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit(): void {}
}
