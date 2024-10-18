const db = require("../db");
const Project = require("./project");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", () => {
    const newProject = {
        title: "p3",
        stack: "s3",
        brief_description: "temporary descrip",
        full_description: "this description is much longer than the previous",
        link: "http://www.doofus.com"
    }
    test("works", async() => {
        let addition = await Project.add(newProject);
        expect(addition).toEqual(newProject);

        const result = await db.query(`
            SELECT title, stack, brief_description, full_description, link
            FROM projects
            WHERE title = "p3"
        `);
        expect(result.rows).toEqual([
            {
                title: "p3",
                stack: "s3",
                brief_description: "temporary descrip",
                full_description: "this description is much longer than the previous",
                link: "http://www.doofus.com"
            }
        ]);
    });
});

describe("find all", () => {
    test("works", async () => {
        const projects = await Project.get();
        expect(projects).toEqual([
            {
                title: "p1",
                stack: "s1",
                brief_description: "temporary descrip",
                full_description: "this description is much longer than the previous",
                link: "http://www.youboo.com"
            },
            {
                title: "p2",
                stack: "s2",
                brief_description: "temporary descrip",
                full_description: "this description is much longer than the previous",
                link: "http://www.galdarn.com"
            },
            {
                title: "p3",
                stack: "s3",
                brief_description: "temporary descrip",
                full_description: "this description is much longer than the previous",
                link: "http://www.doofus.com"
            }
        ]);
    });
});

describe("update", () => {
    test("works", async () => {
        let updatedProject = {
            title: "p3",
            stack: "s4",
            brief_description: "temporary descrip",
            full_description: "this description is much longer than the previous",
            link: "http://www.doofus.com/renob"
        }
        let updateProject = await Project.update(updatedProject);
        expect(updateProject).toEqual(updatedProject);
    })
});

describe("remove", () => {
    test("works", async () => {
        await Project.remove("p3");
        const result = await db.query("SELECT name FROM about WHERE name = 'p3'");
        expect(result.rows.length).toEqual(0);
    })
})