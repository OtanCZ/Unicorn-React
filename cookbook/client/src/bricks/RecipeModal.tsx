import React, {useEffect, useState} from "react";
import {Recipe, Ingredient, Recipes, Ingredients} from "../interfaces";
import Icon from "@mdi/react";
import {mdiClose, mdiContentSave, mdiPencil, mdiTrashCan} from "@mdi/js";

interface ModalProps {
    recipe: Recipe | null;
    onClose: () => void;
    onSave: (updatedRecipe: Recipe) => void;
    onDelete: (deletedRecipe: Recipe) => void;
    editing: boolean;
}

function RecipeModal({recipe, onClose, onSave, onDelete, editing}: ModalProps) {
    const [editableRecipe, setEditableRecipe] = useState<Recipe>(recipe ? {...recipe} : {
        id: "",
        name: "",
        description: "",
        imgUri: "",
        ingredients: [{id: "", name: "", amount: 0, unit: ""}]  // Start with one empty ingredient field
    });
    console.log(editing);
    const [isEditing, setIsEditing] = useState(editing);
    const [ingredients, setIngredients] = useState<Ingredients>([]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

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
                    onClose();
                    return;
                }

                setIngredients(ingredientsJson)

            } catch (error) {
                console.error("An error occurred:", error);
                onClose();
            }
        };
        fetchIngredients()
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const newIngredients = [...editableRecipe.ingredients];
        const newIngredient = ingredients.find(i => i.id === value);
        if (newIngredient) {
            newIngredients[index].id = newIngredient.id;
            newIngredients[index].name = newIngredient.name;
        } else {
            newIngredients.splice(index, 1);
        }

        setEditableRecipe({...editableRecipe, ingredients: newIngredients});
    };

    const addEmptyIngredientField = () => {
        setEditableRecipe({
            ...editableRecipe,
            ingredients: [...editableRecipe.ingredients, {id: "", amount: 0, unit: "", name: ""}]
        });
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validate = () => {
        let validationErrors: { [key: string]: string } = {};

        if (!editableRecipe.name || editableRecipe.name.length === 0) {
            validationErrors.name = "Název je povinný!";
        }

        if (editableRecipe.name.length > 50) {
            validationErrors.name = "Název nemůže být delší jako 50 znaků!";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const {name, value} = e.target;
        if (index !== undefined && index !== null) {
            const updatedValue = name === "amount" ? Number(value) : value;
            const updatedIngredients = [...editableRecipe.ingredients];
            updatedIngredients[index] = {
                ...updatedIngredients[index],
                [name]: updatedValue,
            };
            setEditableRecipe((prev) => ({
                ...prev,
                ingredients: updatedIngredients,
            }));
        } else {
            setEditableRecipe((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleSave = () => {
        if (validate()) {
            const updatedRecipe = {
                ...editableRecipe,
                ingredients: editableRecipe.ingredients.filter(ingredient => ingredient.name !== "")
            };

            onSave(updatedRecipe);
            toggleEdit()
        }
    };

    if (!recipe) return null;

    function handleDelete() {
        onDelete(editableRecipe)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
                className="bg-background p-6 rounded-md w-[90vw] xl:w-[50vw] max-h-[90vh] overflow-auto border-accent border-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isEditing ? editableRecipe.id === "" ? "Nový recept" : "Úprava receptu" : recipe.name}</h2>
                    <div className="flex space-x-2">
                        {recipe.id !== "" && (
                            <button onClick={handleDelete} className="text-primary">
                                <Icon path={mdiTrashCan} color={"#4caf50"} size={1}/>
                            </button>
                        )}
                        <button onClick={isEditing ? handleSave : toggleEdit} className="text-primary">
                            <Icon path={isEditing ? mdiContentSave : mdiPencil} color={"#4caf50"} size={1}/>
                        </button>
                        <button onClick={onClose} className="text-red-500">
                            <Icon path={mdiClose} color={"#f00"} size={1}/>
                        </button>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Název receptu:</label>
                            <input
                                type="text"
                                name="name"
                                value={editableRecipe.name}
                                onChange={handleChange}
                                className="border-2 border-accent bg-primary/10 w-full p-2 rounded-md"
                                maxLength={50}
                                required
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">URL obrázku:</label>
                            <input
                                type="text"
                                name="imgUri"
                                key={editableRecipe.id + "imgUri"}
                                value={editableRecipe.imgUri}
                                onChange={handleChange}
                                className="border-2 border-accent bg-primary/10 w-full p-2 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold">Ingredience:</h3>
                            {editableRecipe.ingredients.map((ingredient, index) => (
                                <div className={"w-full"}>
                                    <select
                                        key={index + "select"}
                                        value={ingredient.id}
                                        onChange={e => handleInputChange(index, e.target.value)}
                                        className="w-[50%] border-2 bg-[#0e2a0d] border-accent rounded-md p-2 mb-2"
                                    >
                                        <option value=""></option>
                                        {ingredients.map((ing, ingIndex) => (
                                            <option key={ingIndex} value={ing.id}>
                                                {ing.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={ingredient.amount}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-[25%] border-2 bg-primary/10 border-accent bg-background rounded-md p-2 mb-2"
                                    />
                                    <input
                                        name="unit"
                                        value={ingredient.unit}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-[25%] border-2 bg-primary/10 border-accent bg-background rounded-md p-2 mb-2"
                                    />
                                </div>
                            ))}
                            <button
                                onClick={addEmptyIngredientField}
                                className="w-full border-accent border-2 rounded-md p-2 bg-primary mt-2"
                            >
                                Přidat ingredienci
                            </button>

                        </div>
                        <div>
                            <label className="block font-bold mb-2">Postup:</label>
                            <textarea
                                name="description"
                                value={editableRecipe.description}
                                onChange={handleChange}
                                className="border-2 border-accent bg-primary/10 w-full p-2 rounded-md"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <img src={recipe.imgUri} alt={"Obrázek " + recipe.name}
                             className="mb-4 w-full h-auto rounded-md"/>
                        <div className="mb-4">
                            <h3 className="font-bold">Ingredience:</h3>
                            <ul className="list-disc list-inside">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">Postup:</h3>
                            <p>{recipe.description}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipeModal;