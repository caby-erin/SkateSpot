import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteNeighborhoodLocations } from '../api/mergedData';

function NeighborhoodCard({ neighborhoodObj, onUpdate }) {
  console.warn('hello');

  const deleteThisNeighborhood = () => {
    if (window.confirm(`Delete ${neighborhoodObj.name}?`)) {
      deleteNeighborhoodLocations(neighborhoodObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="neighborhoodCard">
      <Card.Body>
        <Card.Title>{neighborhoodObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE NEIGHBORHOOD DETAILS  */}
        <div className="neighborhoodButtonsGroup">
          <Link href={`/neighborhood/${neighborhoodObj.firebaseKey}`} passHref>
            <Button variant="primary" className="neighborhoodButton">View</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE NEIGHBORHOOD DETAILS  */}
          <Link href={`/neighborhood/edit/${neighborhoodObj.firebaseKey}`} passHref>
            <Button variant="info" className="neighborhoodButton">✎</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisNeighborhood} className="neighborhoodButton">
            ✖️
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

NeighborhoodCard.propTypes = {
  neighborhoodObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NeighborhoodCard;
