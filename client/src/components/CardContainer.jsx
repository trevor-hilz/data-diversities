import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardCreator from './CardCreator';
import {
  Counties,
  Categories,
  TaxonomicGroups,
  Sortings,
  Directions,
} from '../utils/search.jsx';

const CardContainer = () => {
  const gatherData = () => {
    const countySelection = document.getElementById('countySelector');
    const selectedCounty = countySelection.value;

    const categorySelection = document.getElementById('categorySelector');
    const selectedCategory = categorySelection.value;

    const taxonomicGroupSelection = document.getElementById(
      'taxonomicGroupSelector'
    );
    const selectedTaxonomicGroup = taxonomicGroupSelection.value;

    const sortingSelection = document.getElementById('sortingSelector');
    const selectedSorting = sortingSelection.value;

    const directionSelection = document.getElementById('directionSelector');
    const selectedDirection = directionSelection.value;

    axios
      .get('http://localhost:3000/request/', {
        params: {
          county: selectedCounty,
          category: selectedCategory,
          taxonomicGroup: selectedTaxonomicGroup,
          sorting: selectedSorting,
          direction: selectedDirection,
        },
      })
      .then(function (response) {
        setCards(response.data);
      });
  };

  const CustomSearch = () => {
    const customSelection = document.getElementById('customSelector');
    const custom = customSelection.value;

    const inputSelection = document.getElementById('customInput');
    const input = inputSelection.value;

    console.log(custom, input);
    axios
      .get('http://localhost:3000/request/custom/', {
        params: {
          input: input,
          custom: custom,
        },
      })
      .then(function (response) {
        setCards(response.data);
      });
  };

  const [cards, setCards] = useState([]);

  return (
    <div style={{ gap: '10px', marginTop: '2em' }}>
      <button onClick={gatherData} style={{ marginRight: '10px' }}>
        Search
      </button>

      <select id='countySelector' style={{ marginRight: '10px' }}>
        <option value='' disabled selected>
          --- Select a County ---
        </option>
        {Counties.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>

      <select id='categorySelector'>
        <option value='' disabled selected>
          --- Select a Category ---
        </option>
        {Categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select id='taxonomicGroupSelector' style={{ marginLeft: '10px' }}>
        <option value='' disabled selected>
          --- Select Taxonomic Group ---
        </option>
        {TaxonomicGroups.map((taxonomicGroup, index) => (
          <option key={index} value={taxonomicGroup}>
            {taxonomicGroup}
          </option>
        ))}
      </select>

      <select id='sortingSelector' style={{ marginLeft: '10px' }}>
        <option value='' disabled selected>
          --- Select Sorting ---
        </option>
        {Sortings.map((sorting, index) => (
          <option key={index} value={sorting}>
            {sorting}
          </option>
        ))}
      </select>

      <select id='directionSelector' style={{ marginLeft: '10px' }}>
        <option value='' disabled selected>
          --- Select Direction ---
        </option>
        {Directions.map((direction, index) => (
          <option key={index} value={direction}>
            {direction}
          </option>
        ))}
      </select>
      <div style={{ marginTop: '2em' }}>
        <label style={{ marginRight: '1em' }}>Custom Search: </label>
        <button onClick={CustomSearch} style={{ marginRight: '10px' }}>
          Search
        </button>
        <input id='customInput' placeholder='Enter Details Here'></input>
        <select id='customSelector' style={{ marginLeft: '10px' }}>
          <option value='' disabled selected>
            --- Select Criteria ---
          </option>
          {Sortings.map((sorting, index) => (
            <option key={index} value={sorting}>
              {sorting}
            </option>
          ))}
        </select>
      </div>
      <div>
        <CardCreator cards={cards} />
      </div>
    </div>
  );
};

export default CardContainer;
