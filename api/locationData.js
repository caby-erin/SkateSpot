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
  fetch(`${endpoint}/locations.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorite = Object.values(data).filter((location) => location.favorite);
      resolve(favorite);
    })
    .catch(reject);
});

const communityLocations = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const community = Object.values(data).filter((location) => location.public);
      resolve(community);
    })
    .catch(reject);
});

const getUserFavorites = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const favoriteKeys = Object.keys(data);
        const userFavorites = favoriteKeys.map((key) => ({
          favoriteFirebaseKey: key,
          locationFirebaseKey: data[key].locationFirebaseKey,
          uid: data[key].uid,
        }));
        resolve(userFavorites);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const addFavorite = (locationFirebaseKey, uid) => new Promise((resolve, reject) => {
  const favorite = {
    locationFirebaseKey,
    uid,
    favorites: true,
  };
  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorite),
  })
    .then((response) => response.json())
    .then(({ name }) => {
      const patchedFavorite = { ...favorite, firebaseKey: name };
      resolve(patchedFavorite);
    })
    .catch(reject);
});

const deleteFavorite = (locationFirebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteKey = Object.keys(data).find(
        (key) => data[key].locationFirebaseKey === locationFirebaseKey,
      );
      if (favoriteKey) {
        fetch(`${endpoint}/userFavorites/${uid}/${favoriteKey}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((deleteResponse) => {
            if (deleteResponse.ok) {
              resolve();
            } else {
              reject(new Error('Failed to remove favorite location'));
            }
          })
          .catch(reject);
      } else {
        reject(new Error('Favorite not found'));
      }
    })
    .catch(reject);
});

const getCommunityFavorites = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getEveryLocation = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
  communityLocations,
  getUserFavorites,
  addFavorite,
  deleteFavorite,
  getCommunityFavorites,
  getEveryLocation,
};
