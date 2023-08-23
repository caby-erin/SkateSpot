import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import getNeighborhoods from '../api/neighborhoodData';
import NeighborhoodCard from '../components/NeighborhoodCard';

export default function NayNay() {
// TODO: Set a state for authors
  const [neighborhoods, setNeighborhoods] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the authors
  const getAllTheNeighborhoods = () => {
    getNeighborhoods(user.uid).then(setNeighborhoods);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheNeighborhoods();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/neighborhood/new" passHref>
        <Button>Add A Neighborhood</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.firebaseKey} neighborhoodObj={neighborhood} onUpdate={getAllTheNeighborhoods} />
        ))}
      </div>

    </div>
  );
}
