import { React, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteFavorite, addFavorite } from '../api/locationData';

function OtherUserLocationCard({ locationObj, onUpdate, userFavorites }) {
  const [isFavorite, setIsFavorite] = useState(
    userFavorites.some((favorite) => favorite.locationFirebaseKey === locationObj.firebaseKey),
  );

  const { user } = useAuth();

  useEffect(() => {
    setIsFavorite(
      userFavorites.some((favorite) => favorite.locationFirebaseKey === locationObj.firebaseKey),
    );
  }, [userFavorites, locationObj.firebaseKey]);

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavorite(locationObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(false);
          onUpdate();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addFavorite(locationObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(true);
          onUpdate();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="locationCard">
      <Card.Img variant="top" src={locationObj.image} alt={locationObj.name} style={{ height: '400px' }} className="locationImage" />
      <Card.Body>
        <Card.Title>{locationObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE LOCATION DETAILS  */}
        <div className="locationButtonsGroup">
          <Button onClick={toggleFavorite} className="locationButton">
            {isFavorite ? (
              <div className="activeFavorite"> ★ </div>
            ) : (
              '★'
            )}
          </Button>
          <Link href={`/location/${locationObj.firebaseKey}`} passHref>
            <Button className="locationButton">🔎</Button>
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
  userFavorites: PropTypes.arrayOf(
    PropTypes.shape({
      favoriteFirebaseKey: PropTypes.string.isRequired,
      locationFirebaseKey: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
    }),
  ),
  onUpdate: PropTypes.func.isRequired,
};

OtherUserLocationCard.defaultProps = {
  userFavorites: [],
};

export default OtherUserLocationCard;
