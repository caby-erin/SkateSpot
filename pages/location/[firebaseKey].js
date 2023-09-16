/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { viewLocationDetails } from '../../api/mergedData';

export default function ViewLocation() {
  const [locationDetails, setLocationDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewLocationDetails(firebaseKey).then(setLocationDetails);
  }, [firebaseKey]);

  console.warn(locationDetails.neighborhoodObject?.name);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={locationDetails.image} alt={locationDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {locationDetails.name} in {locationDetails.neighborhoodObject?.name}
          {locationDetails.favorite ? ' ✰' : ''}
        </h5>
        <div className="locationCharacteristics">
          <p>Terrain: {locationDetails.terrain || ''}</p>
          <p>Slope: {locationDetails.slope || ''}</p>
          <p>How Busy: {locationDetails.busy || ''}</p>
          <p>Overall Difficulty: {locationDetails.difficulty || ''}</p>
          <p>Address: {locationDetails.address || ''}</p>
        </div>

        {locationDetails.uid === user.uid ? (
          <Link href={`/location/edit/${locationDetails.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
        ) : (
          ''
        )}

      </div>
    </div>
  );
}
