DROP DATABASE IF EXISTS jonsArt_dev;
CREATE DATABASE jonsArt_dev;

\c jonsArt_dev

DROP TABLE IF EXISTS comments;
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

--TODO: remove this statement if it works without it
-- DROP TABLE IF EXISTS comments;

-- CREATE TABLE users (
--  user_id SERIAL PRIMARY KEY,
--  user_firstName VARCHAR(100),
--  user_lastName VARCHAR(100),
--  user_email VARCHAR(100),
--  user_passWord VARCHAR(100),
-- );

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter VARCHAR(100),
 comment TEXT,
 post_date VARCHAR(10),
 art_id INTEGER REFERENCES gallery (id)
 user_id INTEGER REFERENCES users (user_id)
 ON DELETE CASCADE
);

-- CREATE TABLE userPaymentMethods (
--  paymentMethod_id SERIAL PRIMARY KEY,
-- creditCard_number VARCHAR(16)
-- creditCard_expireDate VARCHAR(4)
-- creditCard_securityCode VARCHAR(4)
-- user_id INTEGER REFERENCES users (user_id)
--  ON DELETE CASCADE
-- );


-- CREATE TABLE shoppingCart (
--  shoppingCart_id SERIAL PRIMARY KEY,
--  item_id INTEGER REFERENCES gallery (id)
--  user_id INTEGER REFERENCES users (id)
--  ON DELETE CASCADE
-- );





