"use strict";

const db = require("../db");
const Project = require("./project");
const Stack = require("./user_stack");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", () => {
    const newStack = {
        name: "stack3",
        familiarity: 4
    }
    test("works", async () => {
        const addStack = await Stack.add(newStack);
        expect(addStack).toEqual(newStack);
        
        const result = await db.query(`
            SELECT name, familiarity
            FROM user_stacks
            WHERE name = "stack3"
        `);
        expect(result.rows).toEqual([newStack]);
    });
});

describe("find all", () => {
    test("works", async () => {
        let allProjects = await Project.get();
        expect(allProjects).toEqual([
            {
                name: "stack1",
                familiarity: 10
            },
            {
                name: "stack2",
                familiarity: 3
            },
            {
                name: "stack3",
                familiarity: 4
            }
        ]);
    });
});

describe("update", () => {
    test("works", async () => {
        let updatedStack = {
            name: "stack3",
            familiarity: 9
        }
        let updateStack = await Stack.update(updatedStack);
        expect(updateStack).toEqual(updatedStack);
    });
});

describe("remove", () => {
    test("works", async () => {
        await Stack.remove("stack3");
        const result = await db.query("SELECT name FROM stack WHERE name = 'stack3'");
        expect(result.rows.length).toEqual(0);
    })
});