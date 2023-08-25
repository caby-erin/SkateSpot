import { getSingleLocation } from './locationData';
import { getSingleNeighborhood } from './neighborhoodData';

const viewLocationDetails = (locationFirebaseKey) => new Promise((resolve, reject) => {
  getSingleLocation(locationFirebaseKey)
    .then((locationObject) => {
      getSingleNeighborhood(locationObject.neighborhood_id)
        .then((neighborhoodObject) => {
          resolve({ neighborhoodObject, ...locationObject });
        });
    }).catch((error) => reject(error));
});

export default viewLocationDetails;
