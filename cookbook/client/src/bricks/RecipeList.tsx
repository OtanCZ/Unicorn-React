import React, {useEffect, useMemo, useState} from "react";
import {Recipes, Recipe, RecipeLoadState} from "../interfaces";
import RecipeCard from "./RecipeCard";
import {mdiFormatListBulleted, mdiGridLarge, mdiPlus, mdiViewGridPlusOutline} from "@mdi/js";
import Icon from "@mdi/react";
import RecipeModal from "./RecipeModal";
import {useUserContext} from "../UserProvider";
import {useSearchParams} from "react-router-dom";

interface RecipeListProps {
    recipes: Recipes;
    setRecipes: React.Dispatch<React.SetStateAction<RecipeLoadState>>;
    state: RecipeLoadState['state'];
}

function RecipeList({recipes, setRecipes, state}: RecipeListProps) {
    const {isAdmin} = useUserContext();
    const [searchBy, setSearchBy] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [searchParams] = useSearchParams();

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

    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
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

    const saveRecipe = async (updatedRecipe: Recipe) => {
        console.log("saved " + updatedRecipe.name)

        let data;

        if (updatedRecipe.id === "") {
            try {
                const res = await fetch("http://localhost:8000/recipe/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedRecipe)
                })

                data = await res.json()
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const res = await fetch("http://localhost:8000/recipe/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedRecipe)
                })

                data = await res.json()
            } catch (e) {
                console.log(e);
            }
        }

        const updatedRecipes = recipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );

        if (updatedRecipe.id === "") {
            updatedRecipes.push(data);
        }

        setRecipes({
            state: state,
            data: updatedRecipes
        });
        console.log(recipes)
        closeModal();
    };

    const deleteRecipe = async (deletedRecipe: Recipe) => {
        let data
        try {
            const res = await fetch("http://localhost:8000/recipe/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deletedRecipe)
            })

            data = await res.json()
            console.log(data);
        } catch (e) {
            console.log(e);
        }

        let updatedIngredients = [...recipes];
        const indexToRemove = recipes.findIndex(recipe => recipe.id === deletedRecipe.id);

        if (indexToRemove !== -1) {
            updatedIngredients.splice(indexToRemove, 1);
        }

        setRecipes({
            state: "success",
            data: updatedIngredients
        });

        closeModal()
    }

    function handleRecipeAddButton() {
        let mockRecipe: Recipe = {
            id: "",
            name: "Nový recept",
            imgUri: "",
            description: "",
            ingredients: []
        }

        handleRecipeClick(mockRecipe);
    }

    useEffect(() => {
        if (searchParams.get("recipe") && state === "success") {
            console.log(recipes)
            console.log(searchParams.get("recipe"));
            const selectedRecipe = recipes.find(recipe => recipe.id === searchParams.get("recipe")) as Recipe | null;
            console.log(selectedRecipe);
            if (selectedRecipe) setSelectedRecipe(selectedRecipe);
            searchParams.delete('recipe');
        }
    }, [state])

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <header className={"fixed top-[5vh] w-full h-[5vh] bg-background xl:w-[80%] z-10"}>
                <nav className={"w-full h-full flex-row flex items-center"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Receptíky</h2>
                    <button
                        className={"invisible xl:visible flex justify-center items-center ml-auto h-[80%] aspect-square mr-[1%] rounded-md border-2 border-accent bg-primary/10"}
                        onClick={handleSelectChangeButton}>
                        <Icon path={listTypeButton.path} color={"#ebf3ea"} size={1}/>
                    </button>
                    <input type={"search"} placeholder={"Vyhledej v receptech"} onInput={handleSearch}
                           className={"border-2 rounded-md border-accent bg-primary/10 w-[50%] xl:w-[30%] h-[80%] mr-[1%]"}></input>
                    {isAdmin && (
                        <>
                            <button
                                className={"flex justify-center items-center h-[80%] aspect-square rounded-md border-2 border-accent bg-primary/10"}
                                onClick={handleRecipeAddButton}>
                                <Icon path={mdiPlus} color={"#ebf3ea"} size={1}/>
                            </button>
                        </>
                    )}
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
                        <ul className="w-[80%] mt-[4vh]">
                            {filteredRecipes.map((recipe: Recipe) => (
                                <li key={recipe.id}
                                    className="border-b border-accent p-4 w-full cursor-pointer hover:bg-primary/15"
                                    onClick={() => handleRecipeClick(recipe)}>
                                    <div className="w-full">
                                        <div>
                                            <h3 className="text-lg">{recipe.name}</h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"grid xl:w-[80%] grid-cols-1 xl:grid-cols-3 gap-4 p-5 xl:p-0 mt-[5vh]"}>
                            {filteredRecipes.map((recipe: Recipe) => (
                                <div key={recipe.id} className={"w-full"} onClick={() => handleRecipeClick(recipe)}>
                                    <RecipeCard recipe={recipe} small={listTypeButton.state === "cards-sm"}/>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {selectedRecipe && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={closeModal}
                    onSave={saveRecipe}
                    onDelete={deleteRecipe}
                    editing={selectedRecipe.id === ""}
                />
            )}
        </div>
    );
}

export default RecipeList;
