CREATE DATABASE forms;


create table program(
    form_id SERIAL PRIMARY KEY,
    form_uid uuid DEFAULT uuid_generate_v4(),
    title text unique
    
);

create table question(
    question_id integer,
    formId integer,
    question text
)

create table response(
    response_id SERIAL PRIMARY KEY,
    formId numeric,
    questionNum numeric,
    response numeric
);