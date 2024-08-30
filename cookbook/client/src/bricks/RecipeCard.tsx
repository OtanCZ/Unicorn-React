import React from "react";
import {Ingredient, Recipe} from "../interfaces";

interface RecipeCardProps {
    recipe: Recipe;
    small: boolean;
}

function RecipeCard({recipe, small}: RecipeCardProps) {
    return (
        <div
            className={"border-2 border-accent rounded-md bg-primary/10 cursor-pointer group hover:bg-primary/15 w-[80vw] xl:w-[25vw]"}>
            <div className={"flex flex-col text-center"}>
                <div className={"border-b-2 border-b-accent"}>
                    {recipe.name}
                </div>
                {/* obrázky se boudou chovat divně podle velikosti, nezkoušeno protože nejsou :D */}
                <div className={"border-b-2 border-b-accent aspect-square overflow-hidden"}>
                    <img
                        src={recipe.imgUri}
                        alt={"Obrázek " + recipe.name}
                        className={"w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"}
                        onError={(e) => {
                            e.currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpPxP74LjqR742xVKTZjCTJdJ9WE9fWgsuQ&s";
                        }}
                    />
                </div>
                <div className={"h-[20vh] overflow-auto text-left p-1 white-space: nowrap;"}>
                    <ul className={"list-disc list-inside"}>
                        {recipe.ingredients.map((ingredient: Ingredient, index) => (
                                <li key={index}>{ingredient.name}</li>
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