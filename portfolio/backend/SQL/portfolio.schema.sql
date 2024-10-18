CREATE TABLE users(
    username VARCHAR(20) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth VARCHAR NOT NULL,
    security_question_a VARCHAR NOT NULL,
    security_answer_a VARCHAR NOT NULL,
    security_question_b VARCHAR NOT NULL,
    security_answer_b VARCHAR NOT NULL
);

CREATE TABLE projects(
    title VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    brief_description VARCHAR NOT NULL,
    full_description VARCHAR NOT NULL,
    link VARCHAR NOT NULL
);

CREATE TABLE images(
    img_name TEXT,
    img BYTEA
);

CREATE TABLE user_stacks(
    name VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    familiarity INT NOT NULL
);

CREATE TABLE project_stacks(
    project_title VARCHAR NOT NULL,
    stack_name VARCHAR NOT NULL,
    CONSTRAINT PK_Project_Stacks PRIMARY KEY (project_title, stack_name),
    FOREIGN KEY (project_title) REFERENCES projects(title),
    FOREIGN KEY (stack_name) REFERENCES user_stacks(name)
);

CREATE TABLE about(
    name TEXT UNIQUE NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR NOT NULL,
    bio VARCHAR NOT NULL
);