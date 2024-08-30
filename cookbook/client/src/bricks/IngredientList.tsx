import React, {useMemo, useState} from "react";
import {IngredientLoadState, Ingredients, Ingredient} from "../interfaces";
import {mdiFormatListBulleted, mdiPlus, mdiViewGridPlusOutline} from "@mdi/js";
import Icon from "@mdi/react";
import IngredientCard from "./IngredientCard";
import IngredientModal from "./IngredientModal";
import {useUserContext} from "../UserProvider";

interface IngredientListProps {
    ingredients: Ingredients;
    setIngredients: React.Dispatch<React.SetStateAction<IngredientLoadState>>;
    state: IngredientLoadState['state'];
}

function IngredientList({ingredients, setIngredients, state}: IngredientListProps) {
    const {isAdmin} = useUserContext();
    const [searchBy, setSearchBy] = useState("");
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

    let buttonTypes = [
        {
            index: 0,
            state: "cards",
            path: mdiViewGridPlusOutline
        },
        {
            index: 1,
            state: "list",
            path: mdiFormatListBulleted
        }
    ];

    const [listTypeButton, changeListTypeButton] = useState(buttonTypes[0]);

    const handleSelectChangeButton = (event: any) => {
        let nextIndex = listTypeButton.index === 1 ? 0 : ++listTypeButton.index;
        changeListTypeButton(buttonTypes[nextIndex]);
    };

    const handleRecipeClick = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
    };

    const closeModal = () => {
        setSelectedIngredient(null);
    };

    const filteredIngredients = useMemo(() => {
        return ingredients.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [ingredients, searchBy]);

    function handleSearch(event: any) {
        setSearchBy(event.target.value);
    }

    const saveIngredient = async (updatedIngredient: Ingredient) => {
        console.log("saved " + updatedIngredient.name)

        let data;

        if (updatedIngredient.id === "") {
            try {
                const res = await fetch("http://localhost:8000/ingredient/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedIngredient)
                })

                data = await res.json()
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const res = await fetch("http://localhost:8000/ingredient/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedIngredient)
                })

                data = await res.json()
            } catch (e) {
                console.log(e);
            }
        }

        const updatedIngredients = ingredients.map(ingredient =>
            ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
        );

        if (updatedIngredient.id === "") {
            updatedIngredients.push(data);
        }

        setIngredients({
            state: state,
            data: updatedIngredients
        });

        console.log(ingredients)
        closeModal();
    };

    const deleteIngredient = async (deletedIngredient: Ingredient) => {
        let data
        try {
            const res = await fetch("http://localhost:8000/ingredient/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deletedIngredient)
            })

            data = await res.json()
            console.log(data);
        } catch (e) {
            console.log(e);
        }

        let updatedIngredients = [...ingredients];
        const indexToRemove = ingredients.findIndex(ingredient => ingredient.id === deletedIngredient.id);

        if (indexToRemove !== -1) {
            updatedIngredients.splice(indexToRemove, 1);
        }

        setIngredients({
            state: "success",
            data: updatedIngredients
        });

        closeModal()
    }

    function handleRecipeAddButton() {
        let mockIngredient: Ingredient = {
            id: "",
            name: "Nová ingredience",
            amount: 0,
            unit: ""
        }

        handleRecipeClick(mockIngredient);
    }

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <header className={"fixed top-[5vh] w-full h-[5vh] bg-background xl:w-[80%] z-10"}>
                <nav className={"w-full h-full flex-row flex items-center"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Ingredience</h2>
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
                            {filteredIngredients.map((ingredient: Ingredient) => (
                                <li key={ingredient.id}
                                    className="border-b border-accent p-4 w-full cursor-pointer hover:bg-primary/15"
                                    onClick={() => handleRecipeClick(ingredient)}>
                                    <div className="w-full">
                                        <div>
                                            <h3 className="text-lg">{ingredient.name}</h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"grid w-[80%] grid-cols-1 xl:grid-cols-3 gap-4 p-5 xl:p-0 mt-[5vh]"}>
                            {filteredIngredients.map((ingredient: Ingredient) => (
                                <div key={ingredient.id} className={"w-full"}
                                     onClick={() => handleRecipeClick(ingredient)}>
                                    <IngredientCard ingredient={ingredient}/>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {selectedIngredient && (
                <IngredientModal
                    ingredient={selectedIngredient}
                    onClose={closeModal}
                    onSave={saveIngredient}
                    onDelete={deleteIngredient}
                    editing={selectedIngredient.id === ""}
                />
            )}
        </div>
    );
}

export default IngredientList;
