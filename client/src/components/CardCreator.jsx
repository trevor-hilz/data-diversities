import React from 'react';

const CardCreator = ({ cards }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '50px',
      }}
    >
      {cards.map((card, index) => (
        <div key={index} className='cardMap'>
          <div>
            <span className='cardRow'>County:</span> {card.county}
          </div>
          <div>
            <span className='cardRow'>Category:</span> {card.category}
          </div>
          <div>
            <span className='cardRow'>Taxonomic Group:</span>{' '}
            {card.taxonomicGroup}
          </div>
          <div>
            <span className='cardRow'>Taxonomic Subgroup:</span>{' '}
            {card.taxonomicSubgroup}
          </div>
          <div>
            <span className='cardRow'>Scientific Name:</span>{' '}
            {card.scientificName}
          </div>
          <div>
            <span className='cardRow'>Common Name:</span> {card.commonName}
          </div>
          <div>
            <span className='cardRow'>Year Last Documented:</span>{' '}
            {card.yearLastDocumented}
          </div>
          <div>
            <span className='cardRow'>NY Listing Status:</span>{' '}
            {card.nyListingStatus}
          </div>
          <div>
            <span className='cardRow'>Federal Listing Status:</span>{' '}
            {card.federalListingStatus}
          </div>
          <div>
            <span className='cardRow'>State Conservation Rank:</span>{' '}
            {card.stateConservationRank}
          </div>
          <div>
            <span className='cardRow'>Global Conservation Rank:</span>{' '}
            {card.globalConservationRank}
          </div>
          <div>
            <span className='cardRow'>Distribution Status:</span>{' '}
            {card.distributionStatus}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCreator;
