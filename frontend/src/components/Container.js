import React from "react";
import About from "./About";
import TechStacks from "./TechStacks";
import Resume from "./Resume";
import Projects from "./Projects";

const Container = ({userToken}) => {
    return (
        <>
            <About userToken={userToken} />
            <TechStacks userToken={userToken} />
            <Resume />
            <Projects userToken={userToken} />
        </>
    )
}

export default Container;