import React, { useState, useEffect } from 'react';

const Fighters = ({ fighter }) => {
  const [showMoreData, setShowMoreData] = useState('');
  return (
    <div className='fighterCard'>
      <img src={fighter.picture} width='300' height='218' alt='FighterImage' />
      <div className='fighterData'>
        <h4 className='fighterName'>{fighter.name}</h4>
        <p>{fighter.division}</p>
        <p>{fighter.nationality}</p>
        <button onClick={() => setShowMoreData(!showMoreData)}>
          {showMoreData ? 'Show less info -' : 'Show more info +'}
        </button>
      </div>
      {showMoreData && (
        <div className='fighterMoreData'>
          <p>
            <span>Age: </span> {fighter.age}
          </p>
          <p>
            <span>Wins: </span> {fighter.wins}
          </p>
          <p>
            <span>Losses: </span> {fighter.losses}
          </p>
          <p>
            <span>Last fought: </span> {fighter.lastfought}
          </p>
          <p>
            <span>Still active: </span> {JSON.stringify(fighter.active)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Fighters;
