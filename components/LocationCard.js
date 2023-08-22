import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { deleteLocation } from '../api/locationData';

function LocationCard({ locationObj, onUpdate }) {
  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationObj.name}?`)) {
      deleteLocation(locationObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={locationObj.image} alt={locationObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{locationObj.name}</Card.Title>
        <p className="card-text bold">{locationObj.favorite && <span>FAV<br /></span> }</p>
        {/* DYNAMIC LINK TO VIEW THE LOCATION DETAILS  */}
        <Link href={`/location/${locationObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE LOCATION DETAILS  */}
        <Link href={`/location/edit/${locationObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisLocation} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default LocationCard;
