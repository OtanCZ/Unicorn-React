import './App.css';
import Icon from "@mdi/react";
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";

function App() {
    let navigate = useNavigate();

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <header className={"fixed top-0 w-full h-[5vh] bg-background xl:w-[80%]"}>
                <nav className={"w-full h-full flex-row flex items-center xl:w-[80%]"}>
                    <h2 className={"text-2xl xl:text-4xl font-bold"}>Hatchery Recepty</h2>

                    <div className={"ml-auto flex flex-row gap-5 m-2"}>
                        <button className={"p-2 border-accent rounded-md bg-primary"} onClick={() => navigate("/recipes")} >Recepty</button>
                        <button className={"p-2 border-accent rounded-md bg-primary"} onClick={() => navigate("/ingredients")} >Ingredience</button>
                    </div>
                </nav>
            </header>

            <Outlet/>
        </div>


    );
}

export default App;
