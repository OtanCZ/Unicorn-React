import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {mdiAccountSchoolOutline, mdiIdentifier} from "@mdi/js";
import {Recipe} from "../interfaces";

interface RecipeCardProps {
    recipe: Recipe;
}

function RecipeCard({recipe}: RecipeCardProps) {
    return (
        <Card className={"border-2 border-emerald-300 rounded-md bg-emerald-800"}>
            <Card.Body className={"flex flex-col text-center"}>
                <div className={"border-b-2 border-b-emerald-300"}>
                    {recipe.name}
                </div>
                {/* obrázky se boudou chovat divně podle velikosti, nezkoušeno protože nejsou :D */}
                <div className={"border-b-2 border-b-emerald-300"}>
                    <img src={recipe.imgUri} alt={"Obrázek " + recipe.name}/>
                </div>
                <div className={"h-[20vh] overflow-auto text-left p-1"}>
                    {recipe.description}
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;