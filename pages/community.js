import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LocationCard from '../components/LocationCard';
import { communityLocations } from '../api/locationData';
import OtherUserLocationCard from '../components/otherUserLocationCard';

function AllUsersLocationsPage() {
  const [publicLocations, setPublicLocations] = useState([]);
  const { user } = useAuth();

  const getAllCommunityLocations = () => {
    communityLocations().then(setPublicLocations);
  };

  useEffect(() => {
    getAllCommunityLocations();
  }, []);

  console.warn(getAllCommunityLocations);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {publicLocations?.map((publicLocation) => (
          user.uid === publicLocation.uid ? (
            <LocationCard key={publicLocation?.firebaseKey} locationObj={publicLocation} onUpdate={getAllCommunityLocations} />
          ) : (
            <OtherUserLocationCard key={publicLocation?.firebaseKey} locationObj={publicLocation} onUpdate={getAllCommunityLocations} />
          )
        ))}
      </div>
    </div>
  );
}

export default AllUsersLocationsPage;
