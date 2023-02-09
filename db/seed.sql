\c jonsArt_dev;

INSERT INTO gallery (title, materials, description, category, post_date, image, length_inches, width_inches, height_inches, depth_inches) 
VALUES ('asian lamps', 'porcelain', 'a pair of very nice blue and white chinese lamps', 'lighting', '2023-01-04', 'https://www.google.com/search?q=pair+asian+lamps&tbm=isch&ved=2ahUKEwjx8Nu19ob9AhVWn3IEHffQBLEQ2-cCegQIABAA&oq=pair+asian+lamps&gs_lcp=CgNpbWcQAzoECAAQQzoFCAAQgAQ6BggAEAcQHjoGCAAQCBAeUPMOWOMXYJoZaABwAHgAgAHrA4gB6AeSAQcyLjMuNC0xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=oxvkY7GTDNa-ytMP96GTiAs&bih=662&biw=1227#imgrc=Bk5NMXbR923LwM', 0, 10, 30, 15 );

INSERT INTO comments (art_id, commenter, comment, post_date )
VALUES
('1', 'Jon', 'This piece rox beyond belief!', '2023-02-08');