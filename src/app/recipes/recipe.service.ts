import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]),
    new Recipe(
      'A Test Recipe',
      'This is smply a test',
      'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ] ),
  ];

    getRecipes() {
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }
}
