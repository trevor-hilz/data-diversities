import axios from 'axios';
import React from 'react';

const gatherData = () => {
  axios.get('http://localhost:3000/request').then(function (response) {
    console.log(response.data);
    return response.data;
  });
};
const CardContainer = () => {
  return (
    <div>
      I am a card container!
      <button onClick={gatherData}>Click Me!</button>
    </div>
  );
};

export default CardContainer;
