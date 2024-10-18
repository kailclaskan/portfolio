import React, {useState} from "react";
import api from "../helpers/api"

const Login = ({setToken}) => {
    
    const retrieveToken = async (username, password) => {
        let token = await api.getToken(username, password);
        if(token !== undefined) setToken(token);
    }

    const INITIAL_STATE = {
        username: "",
        password: ""
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
        retrieveToken(formData.username, formData.password);
        setFormData(INITIAL_STATE);
    }

    return(
        <div className="loginParent">
            <h1 className="loginH1">Log In</h1>
                <form className="loginForm" onSubmit={handleSubmit} action="admin/token" method="POST">
                    <div className="loginDiv">
                        <div>
                            <input
                                type="text"
                                className="loginInputs"
                                placeholder="Username"
                                name="username"
                                id="username"
                                key="username"
                                value={formData.username}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input
                                type="password"
                                className="loginInputs"
                                placeholder="Password"
                                name="password"
                                id="password"
                                key="password"
                                value={formData.password}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="loginDiv">
                        <button className="loginButton">Login</button>
                    </div>
                </form>
        </div>
    )
}

export default Login;