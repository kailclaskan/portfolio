import React, {useState, useEffect} from "react";
import api from "../helpers/api";
import rightArrow from "../img/right_arrow.png";
import downArrow from "../img/down_arrow.png";
import Stack from "./Stack";
import "../CSS/TechStacks.css";

const TechStacks = ({userToken}) => {
    const [info, setInfo] = useState([]);
    let changeSource = () => {
        const btn = document.querySelector("#techStacksBtn");
        if(btn.src === rightArrow) {
            btn.src = downArrow
        } else {
            btn.src = rightArrow;
        }
    }
    const hide = () => {
        let div = document.querySelector("#techStackDiv");
        div.classList.toggle("hidden");
        changeSource();
    }

    useEffect(() => {
        const gatherInfo = async () => {
            const res = await api.getUserStacks();
            setInfo(res.result);
        }
        gatherInfo();
    }, []);

    const INITIAL_STATE = {
        name: "",
        familiarity: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        api.postUserStacks(formData.name, formData.familiarity);
        setFormData(INITIAL_STATE);
    }
    return(
        <div>
            <h2 className="sectionH2">Tech Stacks</h2>
            <img id="techStacksBtn" className="imgBtn" onClick={hide} src={rightArrow} alt="Right Arrow" />
            <div id="techStackDiv" className="hidden">
                <div id="stacks">
                    {info ? info.map(i => {
                        return(
                            <Stack userToken={userToken} i={i} />
                    )}) : null}
                </div>
            {userToken ? <form onSubmit={handleSubmit} action="user_stacks" method="post">
                    <div>
                        <input
                            type="text"
                            className="techStacksInputs"
                            placeholder="Name"
                            name="name"
                            id="name"
                            key="name"
                            value={formData.name}
                            onChange={handleChange} />
                        <input
                            type="text"
                            className="techStacksInputs"
                            placeholder="Familiarity"
                            name="familiarity"
                            id="familiarity"
                            key="familiarity"
                            value={formData.familiarity}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <button>Add</button>
                    </div>
                </form> : null}
            </div>
        </div>
    )
}

export default TechStacks;