import React, {useEffect, useState} from 'react';
import '../App.css';
import {Ingredient, RecipeLoadState, Recipes} from "../interfaces";
import RecipeList from "../bricks/RecipeList";

function RecipeListPage() {
    const [recipeLoadCall, setRecipeLoadCall] = useState<RecipeLoadState>({
        state: "loading",
        data: [] as Recipes
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesResponse = await fetch("http://localhost:8000/recipe/list", {
                    method: "GET",
                });

                const recipesJson = (await recipesResponse.json()) as Recipes;

                if (recipesResponse.status >= 400) {
                    setRecipeLoadCall({state: "error", data: []});
                    console.log(recipesJson);
                    return;
                }

                const ingredientIds = new Set(
                    recipesJson.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.id))
                );

                const ingredientsPromises = Array.from(ingredientIds).map(id =>
                    fetch(`http://localhost:8000/ingredient/get?id=${id}`).then(res => res.json()).catch(err => {
                        console.log(err);
                        return null;
                    })
                );

                const ingredientsMap: Record<string, Ingredient> = {};
                for (const ingredientPromise of ingredientsPromises) {
                    const ingredient: Ingredient = await ingredientPromise;
                    ingredientsMap[ingredient.id] = ingredient;
                }

                setRecipeLoadCall({
                    state: "success",
                    data: recipesJson.map(recipe => ({
                        ...recipe,
                        ingredients: recipe.ingredients.map(ingredient => ({
                            ...ingredient,
                            ...ingredientsMap[ingredient.id],
                        })),
                    })),
                });

            } catch (error) {
                setRecipeLoadCall({state: "error", data: []});
                console.error("An error occurred:", error);
            }
        };
        fetchRecipes()
    }, []);

    return (
        <div
            className={"min-h-screen flex flex-col items-center w-full"}>
            <RecipeList recipes={recipeLoadCall.data} state={recipeLoadCall.state}/>
        </div>
    );
}

export default RecipeListPage;
