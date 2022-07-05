CREATE DATABASE forms;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE program(
    form_id SERIAL PRIMARY KEY,
    form_uid uuid DEFAULT uuid_generate_v4(),
    title text unique
    
);

CREATE TABLE question(
    question_id integer,
    formId integer,
    question text
);

CREATE TABLE response(
    response_id SERIAL PRIMARY KEY,
    formId numeric,
    questionNum numeric,
    response numeric
);

