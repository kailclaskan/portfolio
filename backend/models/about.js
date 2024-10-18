"use strict";

const db = require("../db");

class About {
    static async dupCheck(name){
        const res = await db.query(`
            SELECT name
            FROM about
            WHERE name = $1
        `, [name])

        if(!res.rows[0]) return false;

        return true;
    }
    
    static async get() {
        const res = await db.query(`
            SELECT *
            FROM about
        `);

        return res.rows;
    }

    static async add(name, email, phone, bio){
        const res = await db.query(`
            INSERT INTO about
            (
                name, email, phone, bio
            )
            VALUES ($1, $2, $3, $4)
            RETURNING name, email, phone, bio
        `, [name, email, phone, bio]);

        return res.rows[0];
    }

    static async update(name, email, phone, bio){
        const res = await db.query(`
            UPDATE about
            SET name = $1, email = $2, phone = $3, bio = $4
            WHERE name = $1
        `, [name, email, phone, bio]);

        return res.rows[0];
    }

    static async remove(name){
        const res = await db.query(`
            DELETE FROM about
            WHERE name = $1
            RETURNING name
        `, [name])

       return res.rows[0];
    }
}

module.exports = About;