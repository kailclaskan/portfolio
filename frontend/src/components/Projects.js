import React, {useState, useEffect} from "react";
import api from "../helpers/api"
import rightArrow from "../img/right_arrow.png";
import downArrow from "../img/down_arrow.png";
import "../CSS/Projects.css"
import Project from "./Project";

const Projects = ({userToken}) => {
    const [info, setInfo] = useState([]);
    let changeSource = () => {
        const btn = document.querySelector("#projectsBtn");
        if(btn.src === rightArrow) {
            btn.src = downArrow
        } else {
            btn.src = rightArrow;
        }
    }
    let hide = () => {
        let div = document.querySelector("#projectsDiv");
        div.classList.toggle("hidden");
        changeSource();
    }
    let show = () => {
        let form = document.querySelector("#addProjectForm");
        form.classList.toggle("hidden");
    }
    useEffect(() => {
        const gatherInfo = async () => {
            const res = await api.getProjects();
            setInfo(res.projects);
        }
        gatherInfo();
    }, []);

    const INITIAL_STATE = {
        title: "",
        briefDescription: "",
        fullDescription: "",
        link: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        api.postProjects(formData.title, formData.briefDescription, formData.fullDescription, formData.link);
        setFormData(INITIAL_STATE);
    }
    return(
        <div>
            <h2 className="sectionH2">Projects</h2>
            <img id="projectsBtn" className="imgBtn" onClick={hide} src={rightArrow} alt="Right Arrow" />
            <div id="projectsDiv" className="hidden">
                {info ? info.map(i => {
                    return(
                        <Project userToken={userToken} i={i} />
                )}) : null}
                {userToken ?
                    <div> 
                        <h3>Project Addition</h3>
                        <button onClick={show}>Show</button>
                    </div> : null}
                {userToken ? 
                    <form id="addProjectForm" className="hidden" onSubmit={handleProjectSubmit} action="projects" method="post">
                        <div>
                            <input
                                type="text"
                                className="projectsInputs"
                                placeholder="Title"
                                name="title"
                                id="title"
                                key="title"
                                value={formData.title}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="projectsInputs"
                                placeholder="Brief Description"
                                name="briefDescription"
                                id="briefDescription"
                                key="briefDescription"
                                value={formData.briefDescription}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="projectsInputs"
                                placeholder="Full Description"
                                name="fullDescription"
                                id="fullDescription"
                                key="fullDescription"
                                value={formData.fullDescription}
                                onChange={handleChange} />
                            <input
                                type="text"
                                className="projectsInputs"
                                placeholder="Link"
                                name="link"
                                id="link"
                                key="link"
                                value={formData.link}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <button>Add</button>
                        </div>
                    </form> : null}
                    {/* Add Project Stacks here. */}
            </div>

        </div>
    )
}

export default Projects;