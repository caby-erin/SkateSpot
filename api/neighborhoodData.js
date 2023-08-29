import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getNeighborhoods = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getNeighborhoodLocations = (firebaseKey) => new Promise((resolve, reject) => {
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

const createNeighborhood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods.json`, {
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

const updateNeighborhood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getNeighborhoods,
  getSingleNeighborhood,
  getNeighborhoodLocations,
  createNeighborhood,
  updateNeighborhood,
  deleteSingleNeighborhood,
};
