"use strict";

const express = require("express");
const UserStack = require("../models/user_stack");
const router = new express.Router();


router.get("/", async(req,res,next) => {
    try {
        const result = await UserStack.get();
        if(result) return res.json({result});
        return res.status(400).json({ empty: "Currently no projects exist." });
    } catch (e) {
        return next(e);
    }
});

router.get("/:name", async(req, res, next) => {
    try{
        const {name} = req.params;
        const  duplicate = await UserStack.dupCheck(name);
        if(duplicate) return true;
        return false;
    } catch(e) {
        return next(e);
    }
})

router.post("/", async(req,res,next) => {
    try{
        const {name, familiarity} = req.body;
        const duplicate = await UserStack.dupCheck(name);
        if(duplicate) return res.status(400).json({ create: `${name} already added to system.`});

        await UserStack.add(name, familiarity);
        return res.status(201).json({ added: `${name} added to the system with ${familiarity}`});
    } catch(e) {
        return next(e);
    }
});

router.patch("/", async(req,res,next) => {
    try{
        const {name, familiarity} = req.body;
        const duplicate = await UserStack.dupCheck(name);
        if(!duplicate) return res.status(400).json({ create: `${name} doesn't exist in the system.`});

        await UserStack.update(name, familiarity)
        return res.status(201).json({ updated: `${name} has been updated to a level ${familiarity} familiarity.`});
    } catch(e) {
        return next(e);
    }
})

router.delete("/", async(req,res,next) => {
    try {
        const {name} = req.body;
        const exists = await UserStack.dupCheck(name);
        if(!exists) return res.status(400).json({ create: `${name} doesn't exist in the system.`});

        await UserStack.remove(name);
        return res.status(201).json({ deleted: `${name} deleted from system.`});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;