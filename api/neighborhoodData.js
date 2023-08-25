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

export {
  getNeighborhoods,
  getSingleNeighborhood,
};
