export interface Ingredient {
    id: string;
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

export type Recipes = Recipe[];