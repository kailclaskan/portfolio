"use strict";

const express = require("express");
const About = require("../models/about");
const router = new express.Router();

router.get("/", async(req,res,next) => {
    try {
        const result = await About.get();
        if(result[0]) return res.json(result[0]);
        return res.status(400).json({ empty: "Currently no information exists." })
    } catch (e) {
        return next(e);
    }
});

router.post("/", async(req,res,next) => {
    try{
        const {name, email, phone, bio} = req.body;
        const duplicate = await About.dupCheck(name);
        if(duplicate) return res.status(400).json({ duplicate: `${name} already added to system.`});
        
        await About.add(name,email,phone,bio)
        return res.status(201).json({ added: `${name} added to the system.`});
    } catch(e) {
        return next(e);
    }
})

router.patch("/", async(req,res,next) => {
    try {
        const {name, email, phone, bio} = req.body;
        const duplicate = await About.dupCheck(name);
        if(!duplicate) return res.status(400).json({ duplicate: `${name} not currently in system.`});
        
        await About.update(name, email, phone, bio);
        return res.status(201).json({updated: `${name} updated in the system.`});
    } catch (e) {
        return next(e);
    }
});

router.delete("/", async(req,res,next) => {
    try{
        const {name} = req.body;
        const exists = await About.dupCheck(name);
        if(!exists) return res.status(400).json({ duplicate: `${name} not in the system.`});
        
        await About.remove(name);
        return res.status(201).json({ removed: `${name} removed from system.`})
    } catch (e) {

    }
});

module.exports = router;