DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev


DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title TEXT,
    materials TEXT,
    description TEXT,
    category VARCHAR(100),
    post_date DATE,
    image TEXT,
    length_inches NUMERIC(10,1),
    width_inches NUMERIC(10,1),
    height_inches NUMERIC(10,1),
    depth_inches NUMERIC(10,1)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date DATE,
 art_id INTEGER REFERENCES gallery (id)
 ON DELETE CASCADE
);