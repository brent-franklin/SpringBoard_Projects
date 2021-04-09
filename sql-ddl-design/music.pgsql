-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO producers
  (name)
VALUES
  ('Kanye West'),
  ('Dr. Dre'),
  ('J. Cole'),
  ('Mike Will Made It');

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO artists
  (name)
VALUES
  ('Kendrick Lamar'),
  ('Kanye West'),
  ('Eminem');

CREATE TABLE album
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_date DATE NOT NULL,
  artist_id INT REFERENCES artists
);

INSERT INTO album
  (title, release_date, artist_id)
VALUES
  ('The Slim Shady LP', DATE '1999-02-23', 3),
  ('Section.80', DATE '2011-07-02', 1);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INT NOT NULL,
  album_id INT REFERENCES album,
  producers_id INT REFERENCES producers
);

INSERT INTO songs
  (title, duration_in_seconds, album_id, producers_id)
VALUES
  ('HiiiPoWeR', 279, 2, 3),
  ('My Name Is', 268, 1, 2);



