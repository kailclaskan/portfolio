"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../config");

class User {
    static async dupCheck(username){
        const res = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1
        `, [username])

        if(!res.rows[0]) return false;

        return true;
    }

    static async authenticate(username, password){
        const result = await db.query(`
            SELECT username,
                   password,
                   first_name AS "firstName",
                   last_name AS "lastName",
                   date_of_birth AS "dateOfBirth",
                   security_question_a AS "securityQuestionA",
                   security_answer_a AS "securityAnswerA",
                   security_question_b AS "securityQuestionB",
                   security_answer_b AS "securityAnswerB"
            FROM users
            WHERE username = $1
        `, [username]);

        const user = result.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                delete user.password;
                return user;
            }
        }
        return `Incorrect Password`;
    }

    static async register({username, password, firstName, lastName, dateOfBirth, securityQuestionA, securityAnswerA, securityQuestionB, securityAnswerB}){
        const duplicate = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1
        `, [username]);

        if(duplicate.rows[0]) return `Duplicate User: ${username}`;

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const hashedDOB = await bcrypt.hash(dateOfBirth, BCRYPT_WORK_FACTOR);
        const hashedAnswerA = await bcrypt.hash(securityAnswerA, BCRYPT_WORK_FACTOR);
        const hashedAnswerB = await bcrypt.hash(securityAnswerB, BCRYPT_WORK_FACTOR);

        const result = await db.query(`
            INSERT INTO users
            (
                username,
                password,
                first_name,
                last_name,
                date_of_birth,
                security_question_a,
                security_answer_a,
                security_question_b,
                security_answer_b
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING 
                username, 
                first_name AS "firstName", 
                last_name AS "lastName", 
                date_of_birth AS "dateOfBirth", 
                security_question_a AS "securityQuestionA",
                security_answer_a AS "securityAnswerA",
                security_question_b AS "securityQuestionB",
                security_answer_b AS "securityAnswerB"
        `, [username, hashedPassword, firstName, lastName, hashedDOB, securityQuestionA, hashedAnswerA, securityQuestionB, hashedAnswerB]);

        const user = result.rows[0];

        return user;
    }

    static async forgot(username, dateOfBirth, securityAnswerA, securityAnswerB, newPassword){
        const result = await db.query(`
            SELECT username
            FROM users
                 date_of_birth AS "dateOfBirth",
                 security_question_a AS "securityQuestionA",
                 security_answer_a AS "securityAnswerA",
                 security_question_b AS "securityQuestionB",
                 security_answer_b AS "securityAnswerB"
            WHERE username = $1
        `, [username])

        const user = result.rows[0];

        if(user){
            const dobIsValid = await bcrypt.compare(dateOfBirth, user.dateOfBirth);
            const aIsValid = await bcrypt.compare(securityAnswerA, user.securityAnswerA);
            const bIsValid = await bcrypt.compare(securityAnswerB, user.securityAnswerB);
            if(dobIsValid && aIsValid && bIsValid){
                const change = await db.query(`
                    UPDATE users
                    SET password = $2
                    WHERE username = $1
                `, [username, password]);
                const updated = change.rows[0];
                return updated;
            }
            let message = "User information is incorrect.";
            return message;
        }
    }
}

module.exports = User;