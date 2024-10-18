"use strict";

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const projectRoutes = require("./routes/projects");
const userStackRoutes = require("./routes/user_stacks");
const projectStackRoutes = require("./routes/project_stack");
const aboutRoutes = require("./routes/about");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("tiny"));

app.use("/admin", adminRoutes);
app.use("/projects", projectRoutes);
app.use("/user_stacks", userStackRoutes);
app.use("/project_stacks", projectStackRoutes)
app.use("/about", aboutRoutes);

app.use((err,req,res,next) => {
    if(process.env.NODE_ENV === "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;