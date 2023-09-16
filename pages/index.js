import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getLocations, getUserFavorites } from '../api/locationData';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  const getAllTheLocations = () => {
    getLocations(user.uid).then(setLocations);
  };

  useEffect(() => {
    getAllTheLocations();
  }, []);

  const getTheUserFavorites = () => {
    if (user) {
      getUserFavorites(user.uid).then(setUserFavorites);
    }
  };

  useEffect(() => {
    getAllTheLocations();
    if (user) {
      getTheUserFavorites();
    }
  }, [user]);

  const locationFavorites = locations.map((location) => ({
    ...location,
    isFavorite: userFavorites.some((favorite) => favorite.locationFirebaseKey === location.firebaseKey),
  }));

  return (
    <div className="text-center my-4">
      <SearchBar />
      <div className="d-flex flex-wrap">
        {/* TODO: map over locations here using Locationcard component */}
        {locationFavorites.map((location) => (
          <LocationCard
            key={location.firebaseKey}
            locationObj={location}
            userFavorites={userFavorites}
            onUpdate={getAllTheLocations}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;
