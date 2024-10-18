"use strict";

const express = require("express");
const ProjectStack = require("../models/project_stacks");
const Project = require("../models/project");
const UserStack = require("../models/user_stack");
const router = new express.Router();

router.get("/:project", async(req,res,next) => {
    try {
        const { project } = req.params;
        const result = await ProjectStack.get(project)
        if(result.length !== 0) return res.json({result})
        return res.status(400).json({ empty: "Currently that project doesn't exist in the system."});
    } catch (e) {
        return next(e);
    }
})

router.post("/:project", async(req,res,next) => {
    try {
        const { project } = req.params;
        const { stack } = req.body;
        const projectExists = await Project.dupCheck(project);
        const stackExists = await UserStack.dupCheck(stack);
        const duplicate = await ProjectStack.dupCheck(project, stack)

        if(projectExists && stackExists && !duplicate) {
            await ProjectStack.add(project, stack);

            return res.status(201).json({ added: `${project} now has ${stack} added`})
        }
        return res.status(400).json({ 
            error: `
                        Please review your selections and try again.
                        Issue could be:
                            Duplicate Project-Stack combo
                            Stack doesn't currently exist in user profile.
                            Project doesn't exist in user profile.
                    `
        })        
    } catch (e) {
        return next(e);
    }
});

router.delete("/:project", async(req,res,next) => {
    try {
        const { project } = req.params;
        const { stack } = req.body;
        const exists = await ProjectStack.dupCheck(project,stack);
        if(!exists) return res.status(400).json({ error: "Project-Stack combo doesn't exist in system."})

        await ProjectStack.remove(project,stack);
        return res.status(201).json({ deleted: `${project}-${stack} deleted from system.`});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;