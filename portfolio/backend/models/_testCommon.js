const bcrypt = require("bcrypt");

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

const commonBeforeAll = async () => {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM projects");
    await db.query("DELETE FROM images");
    await db.query("DELETE FROM user_stacks");
    await db.query("DELETE FROM project_stacks");
    await db.query("DELETE FROM about");

    await db.query(`
        INSERT INTO users(username, 
                          password, 
                          first_name, 
                          last_name, 
                          date_of_birth, 
                          security_question_a, 
                          security_answer_a, 
                          security_question_b, 
                          security_answer_b)
        VALUES ("u1", $1, "u1f", "u1l", 01012001, "u1qa", $2, "u1qb", $3),
               ("u2", $4, "u2f", "u2l", 02012001, "u2qa", $5, "u2qb", $6)
        RETURNING ussername
    `, [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("answer1A", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("answer1B", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("answer2A", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("answer2B", BCRYPT_WORK_FACTOR)
    ]);

    await db.query(`
        INSERT INTO projects (title,
                              stack,
                              brief_description,
                              full_description,
                              link)
        VALUES ("p1", "s1", "temporary descrip", "this descrip is much longer than the previous", "http://www.youboo.com"),
               ("p2", "s2", "temporary descrip", "this descrip is much longer than the previous", "http://www.galdarn.com")`);

    await db.query(`
        INSERT INTO user_stacks(name, familiarity)
        VALUES("stack1", 10),
              ("stack2", 3)
    `);

    await db.query(`
        INSERT INTO project_stacks(project_title, stack_name)
        VALUES("p1", "stack1"),
            ("stack2", 3)
    `);

    await db.query(`
            INSERT INTO about(name, email, phone, bio)
            VALUES("Ken", "ken@ken.com", "503-544-2725", "Born in the upper below. It was this time that They could not handle he. Time to fly.")
    `);
}

const commonBeforeEach = async () => {
    await db.query("BEGIN");
}

const commonAfterEach = async () => {
    await db.query("ROLLBACK");
}

const commonAfterAll = async () => {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
}