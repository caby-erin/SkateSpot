import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleNeighborhood } from '../../../api/neighborhoodData';
import NeighborhoodForm from '../../../components/forms/NeighborhoodForm';

export default function EditAuthor() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editItem, setEditItem] = useState({});
  console.warn(firebaseKey);

  useEffect(() => {
    getSingleNeighborhood(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<NeighborhoodForm obj={editItem} />);
}
