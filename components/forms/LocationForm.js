import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getNeighborhoods } from '../../api/neighborhoodData';
import { createLocation, updateLocation } from '../../api/locationData';

const initialState = {
  name: '',
  image: '',
  terrain: '',
  slope: '',
  busy: '',
  address: '',
  difficulty: '',
  favorite: false,
  public: false,
};

function LocationForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getNeighborhoods(user.uid).then(setNeighborhoods);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateLocation(formInput).then(() => router.push(`/location/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createLocation(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLocation(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Location</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Location Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Location Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ADDRESS INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Address" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Street Address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* NEIGHBORHOOD SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Neighborhood">
        <Form.Select
          aria-label="Neighborhood"
          name="neighborhood_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.neighborhood_id}
          required
        >
          <option value="">Select a Neighborhood</option>
          {
            neighborhoods.map((neighborhood) => (
              <option
                key={neighborhood.firebaseKey}
                value={neighborhood.firebaseKey}
              >
                {neighborhood.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* TERRAIN RADIO BUTTONS */}
      <fieldset>
        <legend>Terrain Type</legend>
        <input
          type="radio"
          id="smooth"
          name="terrain"
          value="smooth"
          checked={formInput.terrain === 'smooth'}
          onChange={handleChange}
        />
        <label htmlFor="smooth">Smooth</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="terrain"
          value="mid"
          checked={formInput.terrain === 'mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="bumpy"
          name="terrain"
          value="bumpy"
          checked={formInput.terrain === 'bumpy'}
          onChange={handleChange}
        />
        <label htmlFor="bumpy">Bumpy</label>
        <br />
      </fieldset>

      {/* SLOPE RADIO BUTTONS */}
      <fieldset>
        <legend>Slope</legend>
        <input
          type="radio"
          id="flat"
          name="slope"
          value="flat"
          checked={formInput.slope === 'flat'}
          onChange={handleChange}
        />
        <label htmlFor="flat">Flat</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="slope"
          value="mid"
          checked={formInput.slope === 'mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="steep"
          name="slope"
          value="steep"
          checked={formInput.slope === 'steep'}
          onChange={handleChange}
        />
        <label htmlFor="steep">Steep</label>
        <br />
      </fieldset>

      {/* BUSY RADIO BUTTONS */}
      <fieldset>
        <legend>How Busy</legend>
        <input
          type="radio"
          id="vacant"
          name="busy"
          value="vacant"
          checked={formInput.busy === 'vacant'}
          onChange={handleChange}
        />
        <label htmlFor="vacant">Vacant</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="busy"
          value="mid"
          checked={formInput.busy === 'mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="packed"
          name="busy"
          value="packed"
          checked={formInput.busy === 'packed'}
          onChange={handleChange}
        />
        <label htmlFor="packed">Packed</label>
        <br />
      </fieldset>

      <FloatingLabel controlId="floatingInput4" label="Difficulty" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Overall Difficulty"
          name="difficulty"
          value={formInput.difficulty}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="public"
        name="public"
        label="Make Public?"
        checked={formInput.public}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            public: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Location</Button>
    </Form>
  );
}

LocationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.string,
    favorite: PropTypes.bool,
    public: PropTypes.bool,
    terrain: PropTypes.string,
    slope: PropTypes.string,
    busy: PropTypes.string,
    firebaseKey: PropTypes.string,
    difficulty: PropTypes.string,
  }),
};

LocationForm.defaultProps = {
  obj: initialState,
};

export default LocationForm;
