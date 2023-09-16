import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LocationCard from '../components/LocationCard';
import { communityLocations, getUserFavorites } from '../api/locationData';
import OtherUserLocationCard from '../components/otherUserLocationCard';

function AllUsersLocationsPage() {
  const [publicLocations, setPublicLocations] = useState([]);
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  const getAllCommunityLocations = () => {
    communityLocations().then(setPublicLocations);
  };

  useEffect(() => {
    getAllCommunityLocations();
  }, []);

  console.warn(getAllCommunityLocations);

  const getTheUserFavorites = () => {
    if (user) {
      getUserFavorites(user.uid).then(setUserFavorites);
    }
  };

  useEffect(() => {
    getAllCommunityLocations();
    if (user) {
      getTheUserFavorites();
    }
  }, [user]);

  const publicLocationFavorites = publicLocations.map((location) => ({
    ...location,
    isFavorite: userFavorites.some((favorite) => favorite.locationFirebaseKey === location.firebaseKey),
  }));

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {publicLocationFavorites?.map((publicLocation) => (
          user.uid === publicLocation.uid ? (
            <LocationCard
              key={publicLocation?.firebaseKey}
              locationObj={publicLocation}
              onUpdate={getAllCommunityLocations}
              userFavorites={userFavorites}
            />
          ) : (
            <OtherUserLocationCard
              key={publicLocation?.firebaseKey}
              locationObj={publicLocation}
              onUpdate={getAllCommunityLocations}
              userFavorites={userFavorites}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default AllUsersLocationsPage;
