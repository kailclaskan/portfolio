import React, {useState, useEffect} from "react";
import Stack from "./Stack";
import api from "../helpers/api"

const Project = ({userToken, i}) => {
    let id = i.title.replaceAll(" ", "");
    let [stacks, setStack] = useState([]);
    let show = () => {
        let form = document.querySelector(`#${id}form`);
        form.classList.toggle("hidden");
    }
    let showStack = () => {
        let form = document.querySelector(`#${id}stackform`);
        form.classList.toggle("hidden");
    }
    const INITIAL_STATE = {
        title: "",
        briefDescription: "",
        fullDescription: "",
        link: ""
    }
    const STACK_INITIAL_STATE = {
        title: "",
        stack: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [stackFormData, setStackFormData] = useState(INITIAL_STATE);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }
    const handleStackChange = e => {
        const {name, value} = e.target;
        setStackFormData(data => ({
            ...data,
            [name]: value
        }));
    }
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        api.patchProjects(formData.title, formData.briefDescription, formData.fullDescription, formData.link);
        setFormData(INITIAL_STATE);
    }
    const handleProjectStackSubmit = (e) => {
        e.preventDefault();
        api.postProjectStacks(i.title, stackFormData.stack);
        setStackFormData(STACK_INITIAL_STATE);
    }
    useEffect(() => {
        const gatherInfo = async () => {
            const res = await api.getProjectStacks(i.title);
            setStack(res.result)      
        }
        gatherInfo();
    }, [i.title]);
    return (
        <div className="stackDiv" key={`${id}`}>
            <div id="projectStacksDiv">
                <h2 className="projectTitle">{i.title}</h2>
                {stacks ? stacks.map (s => {
                    return (
                        <Stack i={s.stack_name} />
                    )
                }) : null}
                {userToken ? 
                    <div> 
                        <h3>Add Stack</h3>
                        <button onClick={showStack}>Show</button>
                    </div> : null}
                {userToken ? 
                    <form id={`${id}stackform`} className="hidden" onSubmit={handleProjectStackSubmit} action={`project_stacks/${stackFormData.title}`} method="post">
                        <div>
                            <input
                                type="text"
                                className="projectStackInputs"
                                placeholder="Title"
                                name="title"
                                id="title"
                                key="title"
                                value={i.title}
                                onChange={handleStackChange} />
                            <input
                                type="text"
                                className="projectStackInputs"
                                placeholder="Stack"
                                name="stack"
                                id="stack"
                                key="stack"
                                value={stackFormData.stack}
                                onChange={handleStackChange} />
                        </div>
                        <div>
                            <button>Add</button>
                        </div>
                    </form> : null}
            </div>
            <div className="projectDescLink">
                <p>{i.full_description}</p>
                <a className="projectLink" href={i.link}>{i.title}</a>
            </div>
            {userToken ?                     
                    <div> 
                        <h3>Edit Project</h3>
                        <button onClick={show}>Show</button>
                    </div> : null}
            {userToken ? 
                    <form id={`${id}form`} className="hidden" onSubmit={handleProjectSubmit} action="projects" method="patch">
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
                            <button>Edit</button>
                        </div>
                    </form> : null}
        </div>
    )
}

export default Project;