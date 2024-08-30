export interface Ingredient {
    id: string;
    name: string;
    amount: number;
    unit: string;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    imgUri: string;
    ingredients: Ingredient[];
}

export interface RecipeLoadState {
    state: "loading" | "success" | "error";
    data: Recipes;
}

export interface IngredientLoadState {
    state: "loading" | "success" | "error";
    data: Ingredients;
}

export type Recipes = Recipe[];
export type Ingredients = Ingredient[];