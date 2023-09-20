DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS galleryArtImages;
DROP TABLE IF EXISTS userShoppingCartItem;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS userAddresses;

DROP TABLE IF EXISTS users;



CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title TEXT,
    materials TEXT,
    description TEXT,
    category VARCHAR(100),
    creation_date TIMESTAMP NOT NULL,
    post_date TIMESTAMP NOT NULL,
    diameter TEXT,
    width TEXT,
    height TEXT,
    depth TEXT,
    -- price DOUBLE(2)
    sold BOOLEAN DEFAULT false
);

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date TIMESTAMP NOT NULL,
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
id SERIAL PRIMARY KEY,
user_id VARCHAR(100) NOT NULL UNIQUE,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL CONSTRAINT CHK_email CHECK(
email LIKE '%_@__%.__%'
),
password_digest TEXT NOT NULL 

);

CREATE TABLE userAddresses (
 id SERIAL PRIMARY KEY,
 user_id VARCHAR(100) NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
 streetAddress VARCHAR(100) NOT NULL,
 city VARCHAR(60) NOT NULL,
 state VARCHAR(2) NOT NULL,
 zip VARCHAR(5) NOT NULL
);

CREATE TABLE userShoppingCartItem (
 id SERIAL PRIMARY KEY,
 item_id INTEGER REFERENCES gallery (id),
 FOREIGN KEY (item_id) REFERENCES gallery (id) ON DELETE CASCADE,
 quantity INT NOT NULL DEFAULT 1,
 user_id VARCHAR(100) NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);




-- WORRY ABOUT THIS LATER!





-- CREATE TABLE orders (
-- id SERIAL PRIMARY KEY,
-- user_id VARCHAR(100) NOT NULL,
--  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
-- total
-- );

-- orderitems 
-- serial
-- order id
-- item_id INTEGER REFERENCES gallery (id),
--  FOREIGN KEY (item_id) REFERENCES gallery (id) ON DELETE CASCADE
--  --PRICE AT TIME OF PURCHASE
--  item_price


-- CREATE TABLE userPaymentMethods 
-- LOOK AT INTEGRATING STRIPE!!!



--***********************

    -- password VARCHAR(100) NOT NULL CONSTRAINT CHK_password CHECK (
    --     LENGTH(user_password) >= 8
    --     AND user_password ~ '[A-Z]'
    --     AND user_password ~ '[a-z]'
    --     AND user_password ~ '[0-9]'
    --     AND user_password ~ '[!@#$%^&*()-_+=.,;:~]'
    -- )


