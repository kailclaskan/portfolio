import React from "react";
import pdf from "../Resume.pdf";
import rightArrow from "../img/right_arrow.png";
import downArrow from "../img/down_arrow.png";
import "../CSS/Resume.css"

const Resume = () => {
    let changeSource = () => {
        const btn = document.querySelector("#resumeBtn");
        if(btn.src === rightArrow) {
            btn.src = downArrow
        } else {
            btn.src = rightArrow;
        }
    }
    let hide = () => {
        let div = document.querySelector("#resumeDiv");
        div.classList.toggle("hidden");
        changeSource();
    }
    return(
        <div>
            <h2 className="sectionH2">Resume</h2>
            <img id="resumeBtn" className="imgBtn" onClick={hide} src={rightArrow} alt="Right Arrow" />
            <div id="resumeDiv" className="hidden">
                <embed src={`${pdf}#view=fit&toolbar=0`} width="40%" height="975px" />
            </div>
        </div>
    )
}

export default Resume;