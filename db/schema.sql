DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS galleryArtImages;
DROP TABLE IF EXISTS gallery;

-- DROP TABLE IF EXISTS shoppingCart;

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title TEXT,
    materials TEXT,
    description TEXT,
    category VARCHAR(100),
    post_date VARCHAR(10),
    image TEXT,
    diameter TEXT,
    width TEXT,
    height TEXT,
    depth TEXT
);

CREATE TABLE galleryArtImages (
 image_id SERIAL PRIMARY KEY,
 image_url TEXT,
 art_id INTEGER,
 FOREIGN KEY (art_id) REFERENCES gallery (id) ON DELETE CASCADE
);


--TODO: remove this statement if it works without it
-- DROP TABLE IF EXISTS comments;

-- CREATE TABLE users (
--  user_id SERIAL PRIMARY KEY,
--  user_firstName VARCHAR(100),
--  user_lastName VARCHAR(100),
--  user_email VARCHAR(100),
--  user_passWord VARCHAR(100),
-- );

-- CREATE TABLE usersAdresses (
--  userAddressOption_id SERIAL PRIMARY KEY,
--  user_adress_street VARCHAR(100)
--  user_adress_city VARCHAR(60)
--  user_adress_state VARCHAR(2)
--  user_adress_zip VARCHAR(5)
-- );



CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date VARCHAR(10),
 art_id INTEGER REFERENCES gallery (id)  ON DELETE CASCADE
--  user_id INTEGER REFERENCES users (user_id)

);

-- CREATE TABLE userPaymentMethods 
-- LOOK AT INTEGRATING STRIPE!!!


-- CREATE TABLE shoppingCart (
--  shoppingCart_id SERIAL PRIMARY KEY,
--  item_id INTEGER REFERENCES gallery (id)
--  user_id INTEGER REFERENCES users (id)
--  ON DELETE CASCADE
-- );





