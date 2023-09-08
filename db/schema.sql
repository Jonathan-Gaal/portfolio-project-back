DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS galleryArtImages;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS userAddresses;
-- DROP TABLE IF EXISTS userShoppingCart;
DROP TABLE IF EXISTS users;




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

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date VARCHAR(10),
 art_id INTEGER REFERENCES gallery (id)  ON DELETE CASCADE
--  user_id INTEGER REFERENCES users (user_id)
);

CREATE TABLE galleryArtImages (
 image_id SERIAL PRIMARY KEY,
 image_url TEXT,
 image_caption TEXT,
 art_id INTEGER,
 FOREIGN KEY (art_id) REFERENCES gallery (id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_firstName VARCHAR(100) NOT NULL,
    user_lastName VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL CONSTRAINT CHK_user_email CHECK(
        user_email LIKE '%_@__%.__%'
        ),
    user_password VARCHAR(100) NOT NULL CONSTRAINT CHK_user_password CHECK (
        LENGTH(user_password) >= 8
        AND user_password ~ '[A-Z]'
        AND user_password ~ '[a-z]'
        AND user_password ~ '[0-9]'
        AND user_password ~ '[!@#$%^&*()-_+=.,;:~]'
    )
);

CREATE TABLE userAddresses (
 user_address_id SERIAL PRIMARY KEY,
 user_address_user_id INTEGER NOT NULL, 
 FOREIGN KEY (user_address_user_id) REFERENCES users (user_id) ON DELETE CASCADE,
 user_address_streetAddress VARCHAR(100) NOT NULL,
 user_address_city VARCHAR(60) NOT NULL,
 user_address_state VARCHAR(2) NOT NULL,
 user_address_zip VARCHAR(5) NOT NULL
);

-- CREATE TABLE userShoppingCart (
--  shoppingCart_id SERIAL PRIMARY KEY,
--  item_id INTEGER REFERENCES gallery (id)
--  user_id INTEGER REFERENCES users (id)
--  ON DELETE CASCADE
-- );

-- CREATE TABLE userPaymentMethods 
-- LOOK AT INTEGRATING STRIPE!!!





