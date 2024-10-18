import React from "react";

const Stack = ({i}) => {

    return(
        <div className="projectStackDiv">
        <div>
            {i.familiarity ? `${i.name} | ${i.familiarity}` : `${i}`}
        </div>
    </div>
    )
}

export default Stack;