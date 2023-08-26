import { getSingleLocation } from './locationData';
import { getNeighborhoodLocations, getSingleNeighborhood } from './neighborhoodData';

const viewLocationDetails = (locationFirebaseKey) => new Promise((resolve, reject) => {
  getSingleLocation(locationFirebaseKey)
    .then((locationObject) => {
      getSingleNeighborhood(locationObject.neighborhood_id)
        .then((neighborhoodObject) => {
          resolve({ neighborhoodObject, ...locationObject });
        });
    }).catch((error) => reject(error));
});

const viewNeighborhoodDetails = (neighborhoodFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleNeighborhood(neighborhoodFirebaseKey), getNeighborhoodLocations(neighborhoodFirebaseKey)])
    .then(([neighborhoodObject, neighborhoodLocationsArray]) => {
      resolve({ ...neighborhoodObject, locations: neighborhoodLocationsArray });
    }).catch((error) => reject(error));
});

export {
  viewNeighborhoodDetails,
  viewLocationDetails,
};
