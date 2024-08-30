import React, {useEffect, useState} from 'react';
import '../App.css';
import {IngredientLoadState, Ingredients} from "../interfaces";
import IngredientList from "../bricks/IngredientList";

function IngredientListPage() {
    const [recipeLoadCall, setIngredientLoadCall] = useState<IngredientLoadState>({
        state: "loading",
        data: [] as Ingredients
    });

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredientResponse = await fetch("http://localhost:8000/ingredient/list", {
                    method: "GET",
                });

                const ingredientsJson = (await ingredientResponse.json()) as Ingredients;

                if (ingredientResponse.status >= 400) {
                    //setRecipeLoadCall({state: "error", data: []});
                    console.log(ingredientsJson);
                    return;
                }

                setIngredientLoadCall({
                    data: ingredientsJson,
                    state: "success"
                })
            } catch (error) {
                console.error("An error occurred:", error);
                setIngredientLoadCall({
                    data: [],
                    state: "error"
                })
            }
        };
        fetchIngredients()
    }, []);

    return (
        <div
            className={"min-h-screen flex flex-col items-center w-full"}>
            <IngredientList ingredients={recipeLoadCall.data} setIngredients={setIngredientLoadCall} state={recipeLoadCall.state}/>
        </div>
    );
}

export default IngredientListPage;
