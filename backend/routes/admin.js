"use strict";

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuthSchema.json");
const userRegesterSchema = require("../schemas/userRegisterSchema.json");
const userForgotSchema = require("../schemas/userForgotsSchema.json");
const { json } = require("express");

router.post("/token", async (req,res,next) => {
    try{
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            console.errors(errs);
        }

        const {username,password} = req.body;
        const user = await User.authenticate(username, password);
        if(user){
            const token = createToken(user);
            return res.json({ token });
        }
        return res.json({ error: "No user exists."})
    } catch (e){
        return next(e);
    }
});

router.post("/register", async (req,res,next) => {
    try {
        const validator = jsonschema.validate(req.body, userRegesterSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            console.error(errs);
        }
        const newUser = await User.register({...req.body});
        const token = createToken(newUser);
        return res.status(201).json({token});
    } catch (e){
        return next(e);
    }
});

router.post("/forgot", async (req,res,next) => {
    try{
        const validator = jsonschema.validate(req.body, userForgotSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            console.error(errs);
        }
        const forgotUser = await User.forgot({...req.body});
        if(forgotUser){
            const token = createToken(forgotUser);
            return res.status(201).json({token});
        }
    } catch (e){
        return next(e);
    }
})

module.exports = router;