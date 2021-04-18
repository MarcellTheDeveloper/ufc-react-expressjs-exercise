import React, { useState, useEffect } from 'react';
import Fighters from '../Fighters/Fighters';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const [fighterData, setFighterData] = useState([]);
  const [nationality, setNationality] = useState('');
  const [stillActive, setStillActive] = useState('');
  const [lastFought, setLastfought] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/fighterdata')
      .then((response) => response.json())
      .then((data) => setFighterData(data));
  }, []);

  //filter by activ status and nationality with post
  const filterResults = () => {
    fetch('http://localhost:5000/fighterfilter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active: stillActive, nationality: nationality }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFighterData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //sort by last fought asc,desc
  useEffect(() => {
    if (lastFought === 'Asc') {
      let sortedFighterData = fighterData.sort(
        (a, b) =>
          parseInt(a.lastfought.replace(/\-/g, '')) -
          parseInt(b.lastfought.replace(/\-/g, ''))
      );
      setFighterData(() => [...sortedFighterData]);
    } else if (lastFought === 'Desc') {
      let sortedFighterData = fighterData.sort(
        (a, b) =>
          parseInt(b.lastfought.replace(/\-/g, '')) -
          parseInt(a.lastfought.replace(/\-/g, ''))
      );
      setFighterData(() => [...sortedFighterData]);
    }
    console.log(fighterData);
  }, [lastFought]);

  return (
    <div>
      <div>
        <h4 className='filterTitle'>Filter</h4>
      </div>

      <label htmlFor='nationality'>Nationality </label>
      <select
        name='nationality'
        onChange={(e) => setNationality(e.target.value)}
      >
        <option value=' '></option>
        <option value='USA'>USA</option>
        <option value='Brazil'>Brazil</option>
        <option value='Ireland'>Ireland</option>
        <option value='Russia'>Russia</option>
      </select>

      <label htmlFor='stillActive'>Still active </label>
      <select
        name='stillActive'
        onChange={(e) => setStillActive(e.target.value)}
      >
        <option value=' '></option>
        <option value='true'>Yes</option>
        <option value='false'>No</option>
      </select>
      <button
        className='filterBtn'
        disabled={
          nationality.length > 2 && stillActive.length > 2 ? false : true
        }
        onClick={filterResults}
      >
        Filter
      </button>

      <label id='lastfoughtLabel' htmlFor='lastfought'>
        Sort last fought
      </label>
      <select name='lastfought' onChange={(e) => setLastfought(e.target.value)}>
        <option value=' '></option>
        <option value='Asc'>Asc</option>
        <option value='Desc'>Desc</option>
      </select>

      {fighterData.map((fighter) => (
        <Fighters key={uuidv4()} fighter={fighter} />
      ))}
    </div>
  );
};

export default HomePage;
