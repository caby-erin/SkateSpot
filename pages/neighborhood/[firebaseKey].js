import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewNeighborhoodDetails } from '../../api/mergedData';
import LocationCard from '../../components/LocationCard';

export default function ViewNeighborhood() {
  const [neighborhoodDetails, setNeighborhoodDetails] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn(firebaseKey);

  const seeNeighborhoodDetails = () => {
    viewNeighborhoodDetails(firebaseKey).then(setNeighborhoodDetails);
  };

  useEffect(() => {
    viewNeighborhoodDetails(firebaseKey).then(setNeighborhoodDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={neighborhoodDetails.image} alt={neighborhoodDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {neighborhoodDetails.name}
        </h5>
        <hr />
      </div>
      <div className="d-flex flex-wrap">
        {neighborhoodDetails.locations?.map((location) => (
          <LocationCard key={location.firebaseKey} locationObj={location} onUpdate={seeNeighborhoodDetails} />
        ))}
      </div>
    </div>
  );
}
