INSERT INTO users (username, password, first_name, last_name, phone, addressLine, city, country, zipcode)
VALUES
('john_doe', 'password123', 'John', 'Doe', '1234567890', '123 Main St', 'Anytown', 'USA', '12345'),
('jane_smith', 'securepass', 'Jane', 'Smith', '9876543210', '456 Elm St', 'Somewhere', 'Canada', '54321');

-- Insert a new record into the staffs table for a normal user
INSERT INTO staffs (username, password, first_name, last_name)
VALUES ('normal1', 'password1', 'John', 'Doe');

-- Insert a record into the normals table for the same normal user
INSERT INTO normals (staffID, username, password, first_name, last_name)
VALUES (LAST_INSERT_ID(), 'normal1', 'password1', 'John', 'Doe');

-- Insert a new record into the staffs table for a manager
INSERT INTO staffs (username, password, first_name, last_name)
VALUES ('manager1', 'password1', 'Jane', 'Smith');

-- Insert a record into the managers table for the same manager
INSERT INTO managers (staffID, username, password, first_name, last_name, permission)
VALUES (LAST_INSERT_ID(), 'manager1', 'password1', 'Jane', 'Smith', 1);

INSERT INTO films (title, stock, outline, genre, avg_rating, film_queue, poster_path, staffID, username)
VALUES
('Avengers: Endgame', 100, 'The Avengers assemble once more to undo Thanos''s destruction and restore order to the universe.', 'Action', 8.4, 20, 'avenger-endgame-movie-poster.png', 12, 'manager1'),

('Barbie', 120, 'Follows Barbie on her adventures in a modern-day setting.', 'Family', 7.2, 10, 'barbie-movie-poster.png', 12, 'manager1'),

('Dune: Part One', 80, 'A young nobleman leads a rebellion to fight for control of the desert planet Arrakis.', 'Sci-Fi', 7.9, 112, 'dune-movie-poster.png', 12, 'manager1'),

('Hor Taew Tak The Finale', 30, 'Thai horror-comedy film about a group of friends encountering supernatural events.', 'Horror', 6.12, 12, 'hor-taew-tak-the-finale-movie-poster.png', 12, 'manager1'),

('John Wick: Chapter 2', 70, 'Legendary hitman John Wick is forced back out of retirement by a former associate.', 'Action', 7.12, 12, 'john-wick-chapter-two-movie-poster.png', 12, 'manager1'),

('Jujutsu Kaisen', 60, 'A high school student becomes part of a secret organization battling curses.', 'Anime', 8.6, 18, 'jujutsu-kaisen-japanese-movie-poster.png', 12, 'manager1'),

('Oppenheimer', 40, 'Biographical drama about J. Robert Oppenheimer and the development of the atomic bomb.', 'Drama', 7.8, 8, 'oppenheimer-movie-poster.png', 12, 'manager1'),

('Spider-Man: Across the Spider-Verse', 90, 'Miles Morales navigates multiple dimensions as Spider-Man to stop a new threat.', 'Animation', 9.0, 212, 'spider-man-across-the-spider-verse-movie-poster.png', 12, 'manager1'),

('The Little Mermaid', 60, 'A mermaid princess makes a Faustian bargain with an unscrupulous sea-witch.', 'Fantasy', 7.4, 10, 'the-little-mermaid-movie-poster.png', 12, 'manager1'),

('Fast X', 712, 'The next installment in the Fast & Furious series featuring high-speed action and daring stunts.', 'Action', 7.7, 112, 'fast-x-movie-poster.png', 12, 'manager1');

INSERT INTO directors (filmID, director)
VALUES
(51, 'Anthony Russo, Joe Russo'),
(52, 'Greta Gerwig'),
(53, 'Denis Villeneuve'),
(54, 'Poj Arnon'),
(55, 'Chad Stahelski'),
(56, 'Sunghoo Park'),
(57, 'Christopher Nolan'),
(58, 'Joaquim Dos Santos, Kemp Powers'),
(59, 'Ron Clements, John Musker'),
(60, 'Justin Lin');

INSERT INTO directors (filmID, director)
VALUES
(51, 'Anthony Russo, Joe Russo'),
(52, 'Greta Gerwig'),
(53, 'Denis Villeneuve'),
(54, 'Poj Arnon'),
(55, 'Chad Stahelski'),
(56, 'Sunghoo Park'),
(57, 'Christopher Nolan'),
(58, 'Joaquim Dos Santos, Kemp Powers'),
(59, 'Ron Clements, John Musker'),
(60, 'Justin Lin');
