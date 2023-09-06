import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LocationCard from '../components/LocationCard';
import { favoriteLocations } from '../api/locationData';

function FavoriteLocationsPage() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const getAllFavoriteLocations = () => {
    favoriteLocations(user.uid).then(setFavorites);
  };

  useEffect(() => {
    getAllFavoriteLocations();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {favorites?.map((favoriteLocation) => (
          <LocationCard key={favoriteLocation?.firebaseKey} locationObj={favoriteLocation} onUpdate={getAllFavoriteLocations} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteLocationsPage;
