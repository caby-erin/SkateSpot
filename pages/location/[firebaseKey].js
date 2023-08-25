/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewLocationDetails from '../../api/mergedData';

export default function ViewLocation() {
  const [locationDetails, setLocationDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewLocationDetails(firebaseKey).then(setLocationDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={locationDetails.image} alt={locationDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {locationDetails.name} in {locationDetails.neighborhoodObject?.name}
          {locationDetails.favorite ? ' 🤍' : ''}
        </h5>
        <p>{locationDetails.terrain || ''}</p>
        <hr />
      </div>
    </div>
  );
}
