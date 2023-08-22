import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getLocations = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteLocation = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleLocation = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createLocation = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateLocation = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getLocationsByNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json?orderBy="neighborhood_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteLocations = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json?orderBy="${uid}"`, {
    method: 'GET',
    headers: {
      'Content Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorite = Object.values(data).filter((location) => location.favorite);
      resolve(favorite);
    })
    .catch(reject);
});

export {
  getLocations,
  deleteLocation,
  createLocation,
  getSingleLocation,
  getLocationsByNeighborhood,
  updateLocation,
  favoriteLocations,
};
