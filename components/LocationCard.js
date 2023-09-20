import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import Link from 'next/link';
import { deleteFavorite, deleteLocation, addFavorite } from '../api/locationData';
import { useAuth } from '../utils/context/authContext';

export default function LocationCard({ locationObj, onUpdate, userFavorites }) {
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
          <Button onClick={toggleFavorite} className="locationButton editAndFavoriteButton">
            {isFavorite ? (
              <div className="activeFavorite"> ★ </div>
            ) : (
              '★'
            )}
          </Button>
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

LocationCard.propTypes = {
  locationObj: propTypes.shape({
    image: propTypes.string,
    name: propTypes.string,
    firebaseKey: propTypes.string,
  }).isRequired,
  userFavorites: propTypes.arrayOf(
    propTypes.shape({
      favoriteFirebaseKey: propTypes.string.isRequired,
      locationFirebaseKey: propTypes.string.isRequired,
      uid: propTypes.string.isRequired,
    }),
  ),
  onUpdate: propTypes.func.isRequired,
};

LocationCard.defaultProps = {
  userFavorites: [],
};
