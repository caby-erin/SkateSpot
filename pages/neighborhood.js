import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getNeighborhoods } from '../api/neighborhoodData';
import NeighborhoodCard from '../components/NeighborhoodCard';

export default function Neighborhoods() {
  const [neighborhoods, setNeighborhoods] = useState([]);

  const { user } = useAuth();

  const getAllTheNeighborhoods = () => {
    getNeighborhoods(user.uid).then(setNeighborhoods);
  };

  useEffect(() => {
    getAllTheNeighborhoods();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/neighborhood/new" passHref>
        <Button className="form-buttons">Add A Neighborhood</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.firebaseKey} neighborhoodObj={neighborhood} onUpdate={getAllTheNeighborhoods} />
        ))}
      </div>

    </div>
  );
}
