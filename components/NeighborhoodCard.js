import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function NeighborhoodCard({ neighborhoodObj }) {
  console.warn('hello');

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{neighborhoodObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE NEIGHBORHOOD DETAILS  */}
        <Link href={`/neighborhood/${neighborhoodObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE NEIGHBORHOOD DETAILS  */}
        <Link href={`/neighborhood/edit/${neighborhoodObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

NeighborhoodCard.propTypes = {
  neighborhoodObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default NeighborhoodCard;
