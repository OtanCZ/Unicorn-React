import React, {useMemo, useState} from "react";
import {Recipes, Recipe} from "../interfaces";
import RecipeCard from "./RecipeCard";
import {mdiFormatListBulleted, mdiGridLarge, mdiViewGridPlusOutline} from "@mdi/js";
import Icon from "@mdi/react";

interface RecipeListProps {
    recipes: Recipes;
    state: string;
}

function RecipeList({recipes, state}: RecipeListProps) {
    const [searchBy, setSearchBy] = useState("");

    let buttonTypes = [
        {
            index: 0,
            state: "cards",
            path: mdiViewGridPlusOutline
        },
        {
            index: 1,
            state: "cards-sm",
            path: mdiGridLarge
        },
        {
            index: 2,
            state: "list",
            path: mdiFormatListBulleted
        }
    ];

    const [listTypeButton, changeListTypeButton] = useState(buttonTypes[0]);

    const handleSelectChangeButton = (event: any) => {
        let nextIndex = listTypeButton.index === 2 ? 0 : ++listTypeButton.index;
        changeListTypeButton(buttonTypes[nextIndex]);
    };

    const filteredRecipes = useMemo(() => {
        return recipes.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [recipes, searchBy]);

    function handleSearch(event: any) {
        setSearchBy(event.target.value);
    }

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <header className={"fixed top-[5vh] w-full h-[7vh] p-2 bg-background xl:w-[80%]"}>
                <nav className={"w-full h-full flex-row flex items-center"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Receptíky</h2>
                    <button className={"invisible xl:visible flex justify-center items-center ml-auto h-[80%] aspect-square mr-[1%] rounded-md border-2 border-accent bg-primary/10"} onClick={handleSelectChangeButton}>
                        <Icon path={listTypeButton.path} color={"#ebf3ea"} size={1} />
                    </button>
                    <input type={"search"} placeholder={"Vyhledej v receptech"} onInput={handleSearch}
                           className={"border-2 rounded-md border-accent bg-primary/10 w-[50%] xl:w-[30%] h-[80%]"}></input>
                </nav>
            </header>

            <div className={"mb-[7vh]"}></div>

            {state === "loading" && (
                <div className={"flex justify-center items-center w-full h-[93vh]"}>
                    <h1>Probíhá načítání dat...</h1>
                </div>
            )}
            {state === "error" && (
                <div className={"flex justify-center items-center w-full h-[93vh]"}>
                    <h1>Chyba načítání dat!</h1>
                </div>
            )}
            {state === "success" && (
                <>
                    {listTypeButton.state === "list" ? (
                        <ul className="w-full">
                            {filteredRecipes.map((recipe: Recipe) => (
                                <li key={recipe.id} className="border-b border-accent p-4 mt-[5vh]">
                                    <div className="w-full">
                                        <div>
                                            <h3 className="text-lg">{recipe.name}</h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"grid min-w-full xl:min-w-[80%] grid-cols-1 xl:grid-cols-3 gap-4 p-5 mt-[5vh]"}>
                            {filteredRecipes.map((recipe: Recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} small={listTypeButton.state === "cards-sm"}/>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default RecipeList;
