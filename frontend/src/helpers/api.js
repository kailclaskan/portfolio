import axios from "axios";
const BASE_URL = "https://kennethleepowell-portfolio.herokuapp.com";
//"https://kennethleepowell-portfolio.herokuapp.com";
//"http://localhost:3001"

class PortfolioApi {
    static async request(endpoint, data={}, method="get"){
        console.debug("API Call: ", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${PortfolioApi.token}`};
        const params = (method === "get") ? data : {};

        try{
            return(await axios({url, method, data, params,headers})).data;
        } catch(e) {
            console.error("API Error: ", e.response);
            //Needs to be changed before live.
            let message = "There's an error";
            throw Array.isArray(message) ? message: [message];
        }
    }
    //**********Admin Routes**********
    //admin/token
    static async getToken (username, password) {
        let res = await this.request("admin/token", {username: username, password: password}, "post");
        PortfolioApi.token = res.token;
        return PortfolioApi.token;
    }
    //admin/register
    static async registerUser(username, password, firstName, lastName, dateOfBirth, securityQuestionA, securityAnswerA, securityQuestionB, securityAnswerB) {
        let res = await this.request("admin/register", {
                                                        username:username,
                                                        password:password,
                                                        firstName:firstName,
                                                        lastName:lastName,
                                                        dateOfBirth:dateOfBirth,
                                                        securityQuestionA,
                                                        securityAnswerA,
                                                        securityQuestionB,
                                                        securityAnswerB}, "post");
        PortfolioApi.token = res.token;
        return PortfolioApi.token;
    }
    //admin/forgot
    static async forgotPassword (username, dateOfBirth, securityAnswerA, securityAnswerB){
        let res = await this.request("admin/forgot", {username:username, dateOfBirth:dateOfBirth, securityAnswerA:securityAnswerA, securityAnswerB:securityAnswerB});
        PortfolioApi.token = res.token;
        return PortfolioApi.token;
    }
    //**********Projects Routes**********
    //projects/
    static async getProjects() {
        let res = await this.request("projects");
        return res;
    }
    static async postProjects(title, briefDescription, fullDescription, link) {
        let res = await this.request("projects", {title:title, briefDescription:briefDescription, fullDescription:fullDescription, link:link}, "post");
        return res;
    }
    static async patchProjects(title, briefDescription, fullDescription, link){
        let res = await this.request("projects", {title:title, briefDescription:briefDescription, fullDescription:fullDescription, link:link}, "patch");
        return res;
    }
    static async deleteProjects(title){
        await this.request("projects", {title:title}, "delete")
    }
    //**********User Stacks Routes**********
    //user_stacks
    static async getUserStacks() {
        let res = await this.request("user_stacks");
        return res;
    }
    static async getSpecificStack (name) {
        let exists = await this.request(`user_stacks/${name}`);
        return exists;
    }
    static async postUserStacks(name, familiarity) {
        let res = await this.request("user_stacks", {name:name, familiarity:familiarity}, "post");
        return res;
    }
    static async patchUserStacks(name, familiarity){
        let res = await this.request("user_stacks", {name:name, familiarity:familiarity}, "patch");
        return res;
    }
    static async deleteUserStacks(name){
        let res = await this.request("user_stacks", {name:name}, "delete");
        return res;
    }
    //**********Project Stacks Routes**********
    //project_stacks
    static async getProjectStacks (project) {
        let res = await this.request(`project_stacks/${project}`);
        return res;
    }
    static async postProjectStacks(project, stack){
        let res = await this.request(`project_stacks/${project}`, {stack:stack}, "post");
        return res;
    }
    static async patchProjectStacks(project, stack){
        let res = await this.request(`project_stacks/${project}`, {stack:stack}, "patch");
        return res;
    }
    static async deleteProjectStacks(project, stack){
        let res = await this.request(`project_stacks/${project}`, {stack:stack}, "delete");
        return res;
    }
    //**********About Routes**********
    //about
    static async getAbout () {
        let res = await this.request("about/");
        return res;
    }
    static async postAbout(name, email, phone, bio) {
        let res = await this.request("about/", {name:name, email:email, phone:phone, bio:bio}, "post");
        return res;
    }
    static async patchAbout(name, email, phone, bio) {
        let res = await this.request("about/", {name:name, email:email, phone:phone, bio:bio}, "patch");
        return res;
    }
    static async deleteAbout(name) {
        let res = await this.request("about/", {name:name}, "delete");
        return res;
    }
}

export default PortfolioApi;