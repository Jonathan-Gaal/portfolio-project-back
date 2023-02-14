DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title TEXT,
    materials TEXT,
    description TEXT,
    category VARCHAR(100),
    post_date VARCHAR(10),
    image TEXT,
    diameter_inches TEXT,
    width_inches TEXT,
    height_inches TEXT,
    depth_inches TEXT
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date VARCHAR(10),
 art_id INTEGER REFERENCES gallery (id)
 ON DELETE CASCADE
);