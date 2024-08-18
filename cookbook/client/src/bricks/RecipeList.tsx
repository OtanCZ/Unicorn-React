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
        <div className={"flex flex-col justify-center items-center w-[100%]"}>
            <header className={"fixed top-0 w-[100%] h-[7vh] p-2 backdrop-blur-md"}>
                <nav className={"w-[100%] h-[100%] flex-row flex items-center"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Receptíky</h2>
                    <button className={"invisible xl:visible flex justify-center items-center ml-auto h-[80%] aspect-square mr-[1%] rounded-md border-2 border-emerald-300 bg-emerald-700"} onClick={handleSelectChangeButton}>
                        <Icon path={listTypeButton.path} size={1} />
                    </button>
                    <input type={"search"} placeholder={"Vyhledej v receptech"} onInput={handleSearch}
                           className={"border-2 rounded-md border-emerald-300 bg-emerald-700 w-[50%] xl:w-[30%] h-[80%]"}></input>
                </nav>
            </header>
            <div className={"mb-[7vh]"}></div>

            {state === "loading" && (
                <div className={"flex justify-center items-center w-[100%] h-[93vh]"}>
                    <h1>Probíhá načítání dat...</h1>
                </div>
            )}
            {state === "error" && (
                <div className={"flex justify-center items-center w-[100%] h-[93vh]"}>
                    <h1>Chyba načítání dat!</h1>
                </div>
            )}
            {state === "success" && (
                <>
                    {listTypeButton.state === "list" ? (
                        <ul className="w-[100%]">
                            {filteredRecipes.map((recipe: Recipe) => (
                                <li key={recipe.id} className="border-b border-emerald-300 p-4">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg">{recipe.name}</h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"grid min-w-screen xl:min-w-[80vh] grid-cols-1 xl:grid-cols-3 gap-4 p-5"}>
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
