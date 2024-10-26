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

    if (
      !selectedDirection ||
      !selectedSorting ||
      !selectedCategory ||
      !selectedCounty ||
      !selectedTaxonomicGroup
    ) {
      return alert(
        'Not all fields provided. Please select an option for all fields'
      );
    }

    axios
      .get(
        'http://biodiversity-app-env-1.eba-d5psxzae.us-east-2.elasticbeanstalk.com/request/',
        {
          params: {
            county: selectedCounty,
            category: selectedCategory,
            taxonomicGroup: selectedTaxonomicGroup,
            sorting: selectedSorting,
            direction: selectedDirection,
          },
        }
      )
      .then(function (response) {
        setCards(response.data);
      });
  };

  const CustomSearch = () => {
    const customSelection = document.getElementById('customSelector');
    const custom = customSelection.value;

    const inputSelection = document.getElementById('customInput');
    const input = inputSelection.value;

    if (!custom || !input) {
      return alert('Both fields are required.');
    }

    axios
      .get(
        'http://biodiversity-app-env-1.eba-d5psxzae.us-east-2.elasticbeanstalk.com/request/custom/',
        {
          params: {
            input: input,
            custom: custom,
          },
        }
      )
      .then(function (response) {
        setCards(response.data);
      });
  };

  const [cards, setCards] = useState([]);

  return (
    <div style={{ marginTop: '2em' }}>
      <div className='SearchBoxParent'>
        <div className='RefineSearch'>
          <label style={{ textAlign: 'center', fontSize: '18px' }}>
            Standard Search
          </label>
          <select id='countySelector' className='SearchButtons'>
            <option value='' disabled selected>
              Select a County
            </option>
            {Counties.map((county, index) => (
              <option key={index} value={county}>
                {county}
              </option>
            ))}
          </select>

          <select id='categorySelector' className='SearchButtons'>
            <option value='' disabled selected>
              Select a Category
            </option>
            {Categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select id='taxonomicGroupSelector' className='SearchButtons'>
            <option value='' disabled selected>
              Select Taxonomic Group
            </option>
            {TaxonomicGroups.map((taxonomicGroup, index) => (
              <option key={index} value={taxonomicGroup}>
                {taxonomicGroup}
              </option>
            ))}
          </select>

          <select id='sortingSelector' className='SearchButtons'>
            <option value='' disabled selected>
              Select Sorting
            </option>
            {Sortings.map((sorting, index) => (
              <option key={index} value={sorting}>
                {sorting}
              </option>
            ))}
          </select>

          <select id='directionSelector' className='SearchButtons'>
            <option value='' disabled selected>
              Select Direction
            </option>
            {Directions.map((direction, index) => (
              <option key={index} value={direction}>
                {direction}
              </option>
            ))}
          </select>
          <button onClick={gatherData}>Search</button>
        </div>
        <div>
          <div className='RefineSearch'>
            <label style={{ textAlign: 'center', fontSize: '18px' }}>
              Keyword Search
            </label>
            <input id='customInput' placeholder='Enter Details Here'></input>
            <select id='customSelector' className='SearchButtons'>
              <option value='' disabled selected>
                Select Criteria
              </option>
              {Sortings.map((sorting, index) => (
                <option key={index} value={sorting}>
                  {sorting}
                </option>
              ))}
            </select>
            <button onClick={CustomSearch}>Search</button>
          </div>
        </div>
      </div>
      <div>
        <CardCreator cards={cards} />
      </div>
    </div>
  );
};

export default CardContainer;
