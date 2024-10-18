"use strict";

const db = require("../db");

class User_Stack {
    static async dupCheck(name){
        const res = await db.query(`
            SELECT name
            FROM user_stacks
            WHERE name = $1
        `, [name])

        if(!res.rows[0]) return false;

        return true;
    }

    static async get() {
        const res = await db.query(`
            SELECT *
            FROM user_stacks
        `);

        const stacks = res.rows;
        
        return stacks;
    }
    
    static async add(name, familiarity){
        const res = await db.query(
            `
                INSERT INTO user_stacks
                (
                    name,
                    familiarity
                )
                VALUES ($1, $2)
                RETURNING name, familiarity
            `, [name, familiarity]
        );
        
        const added = res.rows[0];

        return added;
    }

    static async update(name, familiarity) {
        const res = await db.query(
            `
                UPDATE user_stacks
                SET familiarity = $2
                WHERE name = $1
            `, [name, familiarity]
        );

        const updated = res.rows[0];

        return updated;
    }

    static async remove(name) {
        const res = await db.query(
            `
                DELETE FROM user_stacks
                WHERE name = $1
                RETURNING name
            `, [name]
        )
        return res.rows[0];
    }
}

module.exports = User_Stack;