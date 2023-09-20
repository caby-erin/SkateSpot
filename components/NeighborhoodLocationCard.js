import React from 'react';
import { Card, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import Link from 'next/link';
import { deleteLocation } from '../api/locationData';

export default function NeighborhoodLocationCard({ locationObj, onUpdate }) {
  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationObj.name}?`)) {
      deleteLocation(locationObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="locationCard">
      <Card.Img variant="top" src={locationObj.image} alt={locationObj.name} style={{ height: '400px' }} className="locationImage" />
      <Card.Body>
        <Card.Title>{locationObj.name}</Card.Title>
        {/* <p className="card-text bold">{locationObj.favorite && <span>✰Favorite✰<br /></span> }</p> */}
        {/* DYNAMIC LINK TO VIEW THE LOCATION DETAILS  */}
        <div className="locationButtonsGroup">
          <Link href={`/location/${locationObj.firebaseKey}`} passHref>
            <Button className="locationButton">🔎</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE LOCATION DETAILS  */}
          <Link href={`/location/edit/${locationObj.firebaseKey}`} passHref>
            <Button className="locationButton editAndFavoriteButton">✎</Button>
          </Link>
          <Button onClick={deleteThisLocation} className="locationButton">
            ✖️
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

NeighborhoodLocationCard.propTypes = {
  locationObj: propTypes.shape({
    image: propTypes.string,
    name: propTypes.string,
    firebaseKey: propTypes.string,
  }).isRequired,
  onUpdate: propTypes.func.isRequired,
};
