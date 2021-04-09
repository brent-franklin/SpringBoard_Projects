-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

INSERT INTO airlines 
  (name)
VALUES
  ('American Airlines'),
  ('SouthWest Airlines'),
  ('United Airlines');

CREATE TABLE passengers 
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

INSERT INTO passengers
  (first_name, last_name)
VALUES
  ('Brent', 'Franklin'),
  ('Jennifer', 'Finch'),
  ('Sonja', 'Pauley');

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  airlines_id INT REFERENCES airlines,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL, 
  from_city TEXT NOT NULL,
  from_country TEXT NOT NULL,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL
);

INSERT INTO flights
  (airlines_id, departure, arrival, from_city, from_country, to_city, to_country)
VALUES
  (1, '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'Washington DC', 'United States', 'Seattle', 'United States'),
  (3, '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'Tokyo', 'Japan', 'London', 'United Kingdom');


CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  passengers_id INT REFERENCES passengers,
  flight_id INT REFERENCES flights,
  seat TEXT UNIQUE NOT NULL
);

INSERT INTO tickets
  (passengers_id, flight_id, seat)
VALUES
  (1, 2, '33B'),
  (2, 1, '10A'),
  (3, 1, '11A');




