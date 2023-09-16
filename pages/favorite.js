import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserFavorites, getEveryLocation } from '../api/locationData';
import OtherUserLocationCard from '../components/otherUserLocationCard';

export default function UserFavorites() {
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      getUserFavorites(user.uid)
        .then((favorites) => {
          setUserFavorites(favorites);
        })
        .catch((error) => {
          console.error('Error fetching user favorites', error);
        });
    }
  }, [user]);

  useEffect(() => {
    getEveryLocation().then((locationData) => {
      setLocations(locationData);
    })
      .catch((error) => {
        console.error('Error fetching locations', error);
      });
  }, []);

  return (
    <div>
      <div className="user-favorites">My Favorite Locations</div>
      <div className="myFavorites">
        {userFavorites.map((favorite) => {
          const matchingLocation = locations.find((location) => location.firebaseKey === favorite.locationFirebaseKey);
          if (matchingLocation) {
            return (
              <OtherUserLocationCard
                key={matchingLocation.firebaseKey}
                locationObj={matchingLocation}
                userFavorites={userFavorites}
                onUpdate={() => getUserFavorites(user.uid).then((favorites) => setUserFavorites(favorites))}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
