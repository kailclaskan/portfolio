"use strict";

const db = require("../db");

class Project{
    static async dupCheck(title){
        const res = await db.query(`
            SELECT title
            FROM projects
            WHERE title = $1
        `, [title])

        if(!res.rows[0]) return false;

        return true;
    }
    static async get() {
        const res = await db.query(`
            SELECT *
            FROM projects
        `);

        const projects = res.rows;

       return projects;
    }

    static async add(title, briefDescription, fullDescription, link) {
        const res = await db.query(`
            INSERT INTO projects
            (
                title,
                brief_description,
                full_description,
                link
            )
            VALUES ($1, $2, $3, $4)
            RETURNING title, brief_description AS "briefDescription", full_description AS "fullDescription", link            
        `, [title,briefDescription,fullDescription,link]);

        const added = res.rows[0];

        return added;
    }

    static async update(title, briefDescription, fullDescription, link){
        const res = await db.query(`
            UPDATE projects
            SET title = $1, brief_description = $2, full_description = $3, link = $4
            WHERE title = $1
        `, [title, briefDescription,fullDescription,link]);

        const updated = res.rows[0];

        return updated;
    }

    static async remove(title){
        const res = await db.query(`
            DELETE FROM projects
            WHERE title = $1
            RETURNING title
        `, [title]);

        return res.rows[0];
    }
}

module.exports = Project