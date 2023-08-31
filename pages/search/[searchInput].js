/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getLocations } from '../../api/locationData';
import LocationCard from '../../components/LocationCard';
import { useAuth } from '../../utils/context/authContext';

function Search() {
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const getSomeLocations = () => {
    getLocations(user.uid).then((locationArr) => {
      const filterTheLocations = locationArr.filter((location) => location.name.toLowerCase().includes(searchInput) || location.terrain.toLowerCase().includes(searchInput) || location.slope.toLowerCase().includes(searchInput) || location.busy.toLowerCase().includes(searchInput));
      setLocations(filterTheLocations);
    });
  };

  useEffect(() => {
    getSomeLocations();
    return () => {
      setLocations([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {locations.map((obj) => (
          <LocationCard key={obj.firebaseKey} locationObj={obj} onUpdate={getSomeLocations} />
        ))}
      </div>
    </>
  );
}

export default Search;
