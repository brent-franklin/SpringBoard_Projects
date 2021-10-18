import React from 'react';
import Pokedex from './Pokedex';

const pokemon = [
  { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
  { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
  { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
  { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
  { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
  { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
  { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
  { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 },
];

const Pokegame = () => {
  for (let i = 1; i <= pokemon.length; i++) {
    const randIdx = Math.floor(Math.random() * i);
    [pokemon[i - 1], pokemon[randIdx]] = [pokemon[randIdx], pokemon[i - 1]];
  }

  const player1 = pokemon.slice(0, 4);
  const p1Score = player1.reduce((total, curr) => {
    return (total += curr.base_experience);
  }, 0);
  const player2 = pokemon.slice(4, pokemon.length);
  const p2Score = player2.reduce((total, curr) => {
    return (total += curr.base_experience);
  }, 0);
  const isWinner = p1Score > p2Score ? 'player1' : 'player2';

  return (
    <React.Fragment>
      <Pokedex id="player1" pokemon={player1} totalEXP={p1Score} />
      <Pokedex id="player2" pokemon={player2} totalEXP={p2Score} />
      <h1 id="winner">Winner is {isWinner}!!!</h1>
    </React.Fragment>
  );
};

export default Pokegame;
