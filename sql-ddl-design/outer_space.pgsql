-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO galaxies 
  (name)
VALUES 
  ('Milky Way');

CREATE TABLE stars
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  galaxy_id INT REFERENCES galaxies
);

INSERT INTO stars
  (name, galaxy_id)
VALUES 
  ('The Sun', 1),
  ('Proxima Centauri', 1),
  ('Gliese 876', 1);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INT REFERENCES stars
);

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around)
VALUES 
  ('Earth', 1.00, 1),
  ('Mars', 1.88, 1),
  ('Venus', 0.62, 1),
  ('Neptune', 164.8, 1),
  ('Proxima Centaur b', 0.03, 2),
  ('Gliese 876 b', 0.23, 3);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INT REFERENCES planets
);

INSERT INTO moons 
  (name, planet_id)
VALUES 
  ('The Moon', 1),
  ('Phobos', 2),
  ('Deimos', 2),
  ('Naiad', 4),
  ('Thalassa', 4);




