import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {mdiAccountSchoolOutline, mdiIdentifier} from "@mdi/js";
import {Recipes, Recipe} from "../interfaces";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
    recipes: Recipes;
}

function RecipeList({recipes}: RecipeListProps) {
    return (
        <div className={"grid min-w-screen xl:min-w-[80vh] grid-cols-1 xl:grid-cols-3 gap-4 p-5"}>
            {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    );
}

export default RecipeList;
