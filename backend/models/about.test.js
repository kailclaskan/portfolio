"use strict"

const db = require("../db");
const About = require("./about");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", () => {
    const newAbout = {
        name: "a2",
        email: "a2@a2.com",
        phone: "000-000-0000",
        bio: "a2 bio"
    };

    test("works", async() => {
        let bout = await About.add(newAbout);
        expect(bout).toEqual(newAbout);

        const result = await db.query(`
            SELECT name, email, phone, bio
            FROM about
            WHERE name = "a2"
        `);
        expect(result.rows).toEqual([newAbout]);
    });
})

describe("find all", () => {
    test("works", async () => {
        let abouts = await About.get();
        expect(abouts).toEqual([
            {
                name: "Ken",
                email: "ken@ken.com",
                phone: "503-544-2725",
                bio: "Born in the upper below. It was this time that They could not handle he. Time to fly."
            },
            {
                name: "a2",
                email: "a2@a2.com",
                phone: "000-000-0000",
                bio: "a2 bio"
            }
        ]);
    });
});

describe("update", () => {
    test("works", async () => {
        let updatedUser = {
            name: "Ken",
            email: "KailClaskan@hotmail.com",
            phone: "123-123-1234",
            bio: "new bio"
        }
        let updatedAbout = await About.update(updatedUser);
        expect(updatedAbout).toEqual(updatedUser);
    });
});

describe("remove", () => {
    test("works", async () => {
        await About.remove("a2");
        const result = await db.query("SELECT name FROM about WHERE name ='a2'");
        expect(result.rows.length).toEqual(0);
    });
})