"use strict";

const express = require("express");
const Project = require("../models/project");
const router = new express.Router();

router.get("/", async(req,res,next) => {
    try {
        const projects = await Project.get();
        if(projects) return res.json({projects});
        return res.status(400).json({ empty: "Currently no projects exist." })
    } catch (e) {
        return next(e);
    }
});

router.post("/", async(req,res,next) => {
    try{
        const {title, briefDescription, fullDescription, link} = req.body;
        console.log(title)
        const duplicate = await Project.dupCheck(title);
        if(duplicate) return res.status(400).json({ duplicate: `${title} already added to system.`});
        
        await Project.add(title,briefDescription,fullDescription,link);
        return res.status(201).json({ added: `${title} added to the system.`});
    } catch(e) {
        return next(e);
    }
});

router.patch("/", async(req,res,next) => {
    try {
        const {title, briefDescription, fullDescription, link} = req.body;
        const duplicate = await Project.dupCheck(title);
        if(!duplicate) return res.status(400).json({ create: `${title} doesn't exist in the system, please add to system.`});

        await Project.update(title,briefDescription,fullDescription,link);
        return res.status(201).json({ updated: `${title} has been updated.`});
    } catch (e) {
        return next(e);
    }
});

router.delete("/", async(req,res,next) => {
    try {
        const {title} = req.body;
        const exists = await Project.dupCheck(title);
        if(!exists) return res.status(400).json({ null: `${title} does not exist.`});
        
        await Project.remove(title);
        return res.status(201).json({ deleted: `${title} deleted from system.`});

    } catch(e) {
        return next(e);
    }
});

module.exports = router;