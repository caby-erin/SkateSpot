import { getSingleLocation, deleteLocation } from './locationData';
import { getNeighborhoodLocations, getSingleNeighborhood, deleteSingleNeighborhood } from './neighborhoodData';

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

const deleteNeighborhoodLocations = (neighborhoodId) => new Promise((resolve, reject) => {
  getNeighborhoodLocations(neighborhoodId).then((locationsArray) => {
    console.warn(locationsArray, 'Neighborhood Locations');
    const deleteLocationPromises = locationsArray.map((location) => deleteLocation(location.firebaseKey));

    Promise.all(deleteLocationPromises).then(() => {
      deleteSingleNeighborhood(neighborhoodId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewNeighborhoodDetails,
  viewLocationDetails,
  deleteNeighborhoodLocations,
};
