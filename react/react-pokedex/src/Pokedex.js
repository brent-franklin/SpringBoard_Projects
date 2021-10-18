import React from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';

const Pokedex = ({ id, pokemon, totalEXP }) => {
  const playersHand = pokemon.map((p) => (
    <Pokecard
      key={p.id}
      name={p.name}
      type={p.type}
      imgSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
      base_experience={p.base_experience}
    />
  ));

  const score = (
    <div>
      <h1>{id}</h1>
      <p>Score: {totalEXP}</p>
    </div>
  );

  return (
    <React.Fragment>
      {id === 'player1' ? (
        <div className="pokedex">
          {playersHand}
          {score}
        </div>
      ) : (
        <div className="pokedex">
          {score}
          {playersHand}
        </div>
      )}
    </React.Fragment>
  );
};

export default Pokedex;
