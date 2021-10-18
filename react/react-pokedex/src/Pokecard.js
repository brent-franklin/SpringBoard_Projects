import React from 'react';
import './Pokecard.css';

const Pokecard = ({ name, type, imgSrc, base_experience }) => {
  return (
    <div className="pokecard">
      <h2>{name}</h2>
      <img src={imgSrc} alt="Pokemon" />
      <h3>{type}</h3>
      <p>EXP: {base_experience}</p>
    </div>
  );
};

export default Pokecard;
