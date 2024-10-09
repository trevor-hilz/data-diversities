import axios from 'axios';
import React, { useState } from 'react';
import CardCreator from './CardCreator';

const CardContainer = () => {
  const gatherData = () => {
    axios.get('http://localhost:3000/request').then(function (response) {
      console.log(response.data);
      setCards(response.data);
    });
  };

  const [cards, setCards] = useState([]);

  return (
    <div>
      <div
      // style={{
      // border: 'solid, grey, 1px',
      //   display: 'grid',
      //   gridTemplateRows: '1fr 1fr repeat(5, 1fr)',
      //   gridTemplateColumns: '1fr',
      //   gap: '10px',
      // }}
      >
        <CardCreator cards={cards} />
      </div>
      <button onClick={gatherData}>Click Me!</button>
    </div>
  );
};

export default CardContainer;
