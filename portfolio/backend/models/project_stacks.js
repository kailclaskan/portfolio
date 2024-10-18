"use strict"

const db = require("../db");

class Project_Stack {
    static async dupCheck(project, stack){
        const res = await db.query(`
            SELECT project_title, stack_name
            FROM project_stacks
            WHERE project_title = $1 AND stack_name = $2
        `, [project, stack]);

        if(!res.rows[0]) return false

        return true
    }

    static async get(project) {
        const res = await db.query(`
            SELECT *
            FROM project_stacks
            WHERE project_title = $1
        `, [project]);

        const stacks = res.rows;
        
        return stacks;
    }

    static async add(project, stack){
        const res = await db.query(`
            INSERT INTO project_stacks
            (
                project_title,
                stack_name
            )
            VALUES ($1, $2)
            RETURNING project_title, stack_name
        `, [project, stack]);

        const added = res.rows[0];

        return added;
    }

    static async remove(project, stack){
        const res = await db.query(`
            DELETE FROM project_stacks
            WHERE project_title = $1 AND stack_name = $2
            RETURNING project_title, stack_name
        `, [project, stack]);

        const deleted = res.rows[0];

        return deleted;
    }
}

module.exports = Project_Stack;