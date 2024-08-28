import React from "react";
import {Ingredient, Recipe} from "../interfaces";

interface RecipeCardProps {
    recipe: Recipe;
    small: boolean;
}

function RecipeCard({recipe, small}: RecipeCardProps) {
    return (
        <div className={"border-2 border-accent rounded-md bg-primary/10"}>
            <div className={"flex flex-col text-center w-[80vw] xl:w-[25vw]"}>
                <div className={"border-b-2 border-b-accent"}>
                    {recipe.name}
                </div>
                {/* obrázky se boudou chovat divně podle velikosti, nezkoušeno protože nejsou :D */}
                <div className={"border-b-2 border-b-accent"}>
                    <img src={recipe.imgUri} alt={"Obrázek " + recipe.name}/>
                </div>
                <div className={"h-[20vh] overflow-auto text-left p-1 white-space: nowrap;"}>
                    <ul className={"list-disc list-inside"}>
                        {recipe.ingredients.map((ingredient: Ingredient) => (
                                <li>{ingredient.name}</li>
                            )
                        )}
                    </ul>
                    <div>
                        {small ? recipe.description.slice(0, 100) + "..." : recipe.description}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RecipeCard;