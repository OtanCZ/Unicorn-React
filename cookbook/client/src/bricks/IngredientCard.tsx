import React from "react";
import {Ingredient, Recipe} from "../interfaces";

interface IngredientCardProps {
    ingredient: Ingredient;
}

function IngredientCard({ingredient}: IngredientCardProps) {
    return (
        <div
            className={"border-2 border-accent rounded-md bg-primary/10 cursor-pointer hover:bg-primary/15 w-[80vw] xl:w-[25vw]"}>
            <div className={"flex flex-col text-center"}>
                <div className={""}>
                    {ingredient.name}
                </div>
            </div>
        </div>
    );
}

export default IngredientCard;