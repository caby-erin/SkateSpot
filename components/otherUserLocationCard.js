import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

function OtherUserLocationCard({ locationObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="locationCard">
      <Card.Img variant="top" src={locationObj.image} alt={locationObj.name} style={{ height: '400px' }} className="locationImage" />
      <Card.Body>
        <Card.Title>{locationObj.name}</Card.Title>
        <p className="card-text bold">{locationObj.favorite && <span>✰Favorite✰<br /></span> }</p>
        {/* DYNAMIC LINK TO VIEW THE LOCATION DETAILS  */}
        <div className="locationButtonsGroup">
          <Link href={`/location/${locationObj.firebaseKey}`} passHref>
            <Button className="locationButton">VIEW</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

OtherUserLocationCard.propTypes = {
  locationObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};

export default OtherUserLocationCard;
