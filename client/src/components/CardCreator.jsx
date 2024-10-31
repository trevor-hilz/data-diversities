import React from 'react';

const CardCreator = ({ cards }) => {
  return (
    <div>
      <div
        className='md-show'
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
            <div style={{ backgroundColor: 'lightgreen', borderRadius: '5px' }}>
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
      <div>
        <div className='md-hidden'>
          <table>
            <caption>NYS Biodiversity Table</caption>
            <thead>
              <tr style={{ textDecoration: 'underline' }}>
                <th>County</th>
                <th>Category</th>
                <th>Taxonomic Group</th>
                <th>Taxonomic Subgroup</th>
                <th>Scientific Name</th>
                <th>Common Name</th>
                <th>Year Last Documented</th>
                <th>NY Listing Status</th>
                <th>Federal Listing Status</th>
                <th>State Conservation Rank</th>
                <th>Glogal Conservation Rank</th>
                <th>Distribution Status</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={index}>
                  <td className='rowStyling'>{card.county}</td>
                  <td className='rowStyling'>{card.category}</td>
                  <td className='rowStyling'>{card.taxonomicGroup}</td>
                  <td className='rowStyling'>{card.taxonomicSubgroup}</td>
                  <td className='rowStyling'>{card.scientificName}</td>
                  <td className='rowStyling'>{card.commonName}</td>
                  <td className='rowStyling'>{card.yearLastDocumented}</td>
                  <td className='rowStyling'>{card.nyListingStatus}</td>
                  <td className='rowStyling'>{card.federalListingStatus}</td>
                  <td className='rowStyling'>{card.stateConservationRank}</td>
                  <td className='rowStyling'>{card.globalConservationRank}</td>
                  <td className='rowStyling'>{card.distributionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardCreator;
