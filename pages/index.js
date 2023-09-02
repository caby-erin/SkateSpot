import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getLocations } from '../api/locationData';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';

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
      <SearchBar />
      <div className="d-flex flex-wrap">
        {/* TODO: map over locations here using Locationcard component */}
        {locations.map((location) => (
          <LocationCard key={location.firebaseKey} locationObj={location} onUpdate={getAllTheLocations} />
        ))}
      </div>

    </div>
  );
}

export default Home;
