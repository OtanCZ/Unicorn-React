import React, {useState} from "react";
import {Ingredient} from "../interfaces";
import Icon from "@mdi/react";
import {mdiClose, mdiContentSave, mdiPencil, mdiTrashCan} from "@mdi/js";
import {useUserContext} from "../UserProvider";

interface ModalProps {
    ingredient: Ingredient | null;
    onClose: () => void;
    onSave: (updatedIngredient: Ingredient) => void;
    onDelete: (deletedIngredient: Ingredient) => void;
    editing: boolean;
}

function IngredientModal({ingredient, onClose, onSave, onDelete, editing}: ModalProps) {
    const {isAdmin} = useUserContext();
    const [editableIngredient, setEditableIngredient] = useState<Ingredient>(ingredient ? {...ingredient} : {
        id: "",
        name: "",
        amount: 0,
        unit: "",
    });

    const [isEditing, setIsEditing] = useState(editing);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validate = () => {
        let validationErrors: { [key: string]: string } = {};

        if (!editableIngredient.name || editableIngredient.name.length === 0) {
            validationErrors.name = "Název je povinný!";
        }

        if (editableIngredient.name.length > 20) {
            validationErrors.name = "Název nemůže být delší jako 20 znaků!";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const {name, value} = e.target;
        setEditableIngredient((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    if (!ingredient) return null;

    function handleSave() {
        if (validate()) {
            onSave(editableIngredient);
            toggleEdit();
        }
    }

    function handleDelete() {
        onDelete(editableIngredient)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-background p-6 rounded-md w-[90vw] xl:w-[50vw] max-h-[90vh] overflow-auto border-accent border-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isEditing ? editableIngredient.id === "" ? "Nová ingredience" : "Úprava ingredience" : ingredient.name}</h2>
                    <div className="flex space-x-2">
                        {isAdmin && (<>
                                {
                                    ingredient.id !== "" && (
                                        <button onClick={handleDelete} className="text-primary">
                                            <Icon path={mdiTrashCan} color={"#4caf50"} size={1}/>
                                        </button>
                                    )
                                }
                                <button onClick={isEditing ? handleSave : toggleEdit} className="text-primary">
                                    <Icon path={isEditing ? mdiContentSave : mdiPencil} color={"#4caf50"} size={1}/>
                                </button>
                            </>

                        )}
                        <button onClick={onClose} className="text-red-500">
                            <Icon path={mdiClose} color={"#f00"} size={1}/>
                        </button>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Název ingredience:</label>
                            <input
                                type="text"
                                name="name"
                                value={editableIngredient.name}
                                onChange={handleChange}
                                className={"border-2 border-accent bg-primary/10 w-full p-2 rounded-md"}
                                maxLength={20}
                                required
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    )
        ;
}

export default IngredientModal;