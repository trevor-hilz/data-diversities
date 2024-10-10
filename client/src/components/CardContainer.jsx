import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardCreator from './CardCreator';
import { Counties, Categories, TaxonomicGroups } from '../utils/search.jsx';

const CardContainer = () => {
  const gatherData = () => {
    axios.get('http://localhost:3000/request').then(function (response) {
      console.log(response.data);
      setCards(response.data);
    });
  };
  let searched = false;
  const [cards, setCards] = useState([]);

  return (
    <div style={{ gap: '10px' }}>
      <label style={{ paddingRight: '1em' }}>Refine Results Here:</label>
      <button onClick={gatherData} style={{ marginRight: '10px' }}>
        Search
      </button>
      <select id='countySelector' style={{ marginRight: '10px' }}>
        <option value=''>-- Select County --</option>
        {Counties.map((county, index) => (
          <option value={county}>{county}</option>
        ))}
      </select>
      <select id='categorySelector'>
        <option value=''>-- Select Category --</option>
        {Categories.map((category, index) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <select id='taxonomicGroupSelector' style={{ marginLeft: '10px' }}>
        <option value=''>-- Select Taxonomic Group --</option>
        {TaxonomicGroups.map((taxonomicGroup, index) => (
          <option value={taxonomicGroup}>{taxonomicGroup}</option>
        ))}
      </select>
      <div>
        <CardCreator cards={cards} />
      </div>
    </div>
  );
};

export default CardContainer;
