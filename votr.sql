DROP DATABASE IF EXISTS votr;
CREATE DATABASE votr;

\c votr;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL
);

CREATE TABLE polls (
    poll_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id SERIAL NOT NULL
);

CREATE TABLE options (
    option_id SERIAL PRIMARY KEY,
    option VARCHAR(255) NOT NULL,
    poll_id SERIAL NOT NULL
);

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    poll_id SERIAL NOT NULL,
    option_id SERIAL NOT NULL,
    username VARCHAR(255),
    ip_address VARCHAR(16)
);

INSERT INTO users (username)
VALUES ('derek');

INSERT INTO polls (title, user_id)
VALUES (
    'What is your favorite color?',
    (SELECT user_id FROM users WHERE username = 'derek')
);

INSERT INTO options (option, poll_id)
VALUES (
    'blue',
    (SELECT poll_id FROM polls WHERE title = 'What is your favorite color?')
);

INSERT INTO options (option, poll_id)
VALUES (
    'red',
    (SELECT poll_id FROM polls WHERE title = 'What is your favorite color?')
);

INSERT INTO options (option, poll_id)
VALUES (
    'green',
    (SELECT poll_id FROM polls WHERE title = 'What is your favorite color?')
);
