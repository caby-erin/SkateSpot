import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getLocations } from '../api/locationData';
import LocationCard from '../components/LocationCard';

function Home() {
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const getAllTheLocations = () => {
    getLocations(user.uid).then(setLocations);
  };

  useEffect(() => {
    getAllTheLocations();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/location/new" passHref>
        <Button>Add A Location</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {locations.map((location) => (
          <LocationCard key={location.firebaseKey} locationObj={location} onUpdate={getAllTheLocations} />
        ))}
      </div>

    </div>
  );
}

export default Home;
