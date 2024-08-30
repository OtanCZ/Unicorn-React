import './App.css';
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useUserContext} from "./UserProvider";

function App() {
    let navigate = useNavigate();
    const { isAdmin, toggleAdmin } = useUserContext();

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <header className={"fixed top-0 w-full h-[5vh] bg-background xl:w-[80%] z-10"}>
                <nav className={"w-full h-full flex-row flex items-center xl:w-[80%]"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Hatchery Recepty</h2>

                    <div className={"ml-auto flex flex-row gap-5 m-2"}>
                        <button className={"p-2 border-accent rounded-md bg-primary"} onClick={() => navigate("/recipes")} >Recepty</button>
                        <button className={"p-2 border-accent rounded-md bg-primary"} onClick={() => navigate("/ingredients")} >Ingredience</button>
                    </div>
                </nav>
            </header>

            <Outlet/>

            <footer className={"flex flex-row justify-center items-center mt-[5vh] gap-5"}>
                <button onClick={toggleAdmin}>{isAdmin? "Jsi admin! (klikni)" : "Jsi standardní uživatel (klikni)"}</button>
            </footer>
        </div>


    );
}

export default App;
