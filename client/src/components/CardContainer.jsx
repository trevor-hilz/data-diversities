import axios from 'axios';
import React, {useState} from 'react';


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
      I am a card container!
      <button onClick={gatherData}>Click Me!</button>
    </div>
  );
};

export default CardContainer;
