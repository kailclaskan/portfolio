import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../helpers/useLocalStorage";

import Login from "./Login";
import Container from "./Container";

const Portfolio = () => {
    const [token, setToken] = useLocalStorage("token");

    const signOut = () => {
        window.localStorage.clear();
    }
    useEffect(()=>{
        if(token === undefined){
            signOut();
        }
    }, []);

    return (
        <>
            <h1>Kenneth L Powell</h1>
            <h6>**As a bit of a warning, I'm using a free Dyno from Heroku and it may take a few to wake up the Database, please be patient.**</h6>
            {token ? <button onClick={signOut}>Sign Out</button> : null}
            {token ? <a href="/">Home Page</a> : null}
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/" element={<Container userToken={token} />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Portfolio;