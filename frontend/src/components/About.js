import React, {useState, useEffect} from "react";
import api from "../helpers/api"
import rightArrow from "../img/right_arrow.png";
import downArrow from "../img/down_arrow.png";
import "../CSS/About.css"

const About = ({userToken}) => {
    const [info, setInfo] = useState({});
    let changeSource = () => {
        const btn = document.querySelector("#aboutBtn");
        if(btn.src === rightArrow) {
            btn.src = downArrow
        } else {
            btn.src = rightArrow;
        }
    }
    const postPatch = () => {
        if(Object.keys(info).length > 0) return "patch"

        return "post";
    }
    let method = postPatch();
    const hide = () => {
        let div = document.querySelector("#aboutDiv");
        div.classList.toggle("hidden");
        changeSource();
    }
    
    useEffect(() => {
        const gatherInfo = async() => {
            const res = await api.getAbout();
            setInfo(res);
        }
        gatherInfo();
    }, []);
    const INITIAL_STATE = info ? {
        name: info.name,
        email: info.email,
        phone: info.phone,
        bio: info.bio
    } : {
        name: "",
        email: "",
        phone: "",
        bio: ""
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
        method === "post" ? api.postAbout(formData.name, formData.email, formData.phone,formData.bio) : api.patchAbout(formData.name, formData.email, formData.phone,formData.bio);
        setFormData(INITIAL_STATE);
    }
    return(
        <div>
            <h2 className="sectionH2">About</h2>
            <img id="aboutBtn" className="imgBtn" onClick={hide} src={rightArrow} alt={info.name} />
            <div id="aboutDiv" className="hidden">
                <div id="aboutInfo">
                    {info.email ? <div className="unified"><strong>Email:</strong> <p id="aboutEmail">{info.email}</p></div> : null}
                    {info.phone ? <div className="unified"><strong>Phone:</strong> <p id="aboutPhone">{info.phone}</p></div> : null}
                </div>
                <div id="aboutBioDiv">
                    {info.bio ? <p id="aboutBio">{info.bio}</p> : null}
                </div>
                <div id="aboutForm">
                    {userToken ? <form onSubmit={handleSubmit} action="about" method={method}>
                        <div>
                            <input
                                type="text"
                                className="aboutInputs"
                                placeholder="Name"
                                name="name"
                                id="name"
                                key="name"
                                value={formData.name}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="aboutInputs"
                                placeholder="Email"
                                name="email"
                                id="email"
                                key="email"
                                value={formData.email}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="aboutInputs"
                                placeholder="Phone"
                                name="phone"
                                id="phone"
                                key="phone"
                                value={formData.phone}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="aboutInputs"
                                placeholder="Bio"
                                name="bio"
                                id="bio"
                                key="bio"
                                value={formData.bio}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>  
                    </form> : null}
                </div>
            </div>
        </div>
    )
}

export default About;