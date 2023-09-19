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
  difficulty: 1,
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
      [name]: name === 'difficulty' ? parseInt(value, 10) : value,
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
          value="Smooth"
          checked={formInput.terrain === 'Smooth'}
          onChange={handleChange}
        />
        <label htmlFor="smooth">Smooth</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="terrain"
          value="Mid"
          checked={formInput.terrain === 'Mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="bumpy"
          name="terrain"
          value="Bumpy"
          checked={formInput.terrain === 'Bumpy'}
          onChange={handleChange}
        />
        <label htmlFor="bumpy">Bumpy</label>
        <br />
      </fieldset>

      {/* SLOPE RADIO BUTTONS */}
      <fieldset>
        <br />
        <legend>Slope</legend>
        <input
          type="radio"
          id="flat"
          name="slope"
          value="Flat"
          checked={formInput.slope === 'Flat'}
          onChange={handleChange}
        />
        <label htmlFor="flat">Flat</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="slope"
          value="Mid"
          checked={formInput.slope === 'Mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="steep"
          name="slope"
          value="Steep"
          checked={formInput.slope === 'Steep'}
          onChange={handleChange}
        />
        <label htmlFor="steep">Steep</label>
        <br />
      </fieldset>

      {/* BUSY RADIO BUTTONS */}
      <fieldset>
        <br />
        <legend>How Busy</legend>
        <input
          type="radio"
          id="vacant"
          name="busy"
          value="Vacant"
          checked={formInput.busy === 'Vacant'}
          onChange={handleChange}
        />
        <label htmlFor="vacant">Vacant</label>
        <br />
        <input
          type="radio"
          id="mid"
          name="busy"
          value="Mid"
          checked={formInput.busy === 'Mid'}
          onChange={handleChange}
        />
        <label htmlFor="mid">Mid</label>
        <br />
        <input
          type="radio"
          id="packed"
          name="busy"
          value="Packed"
          checked={formInput.busy === 'Packed'}
          onChange={handleChange}
        />
        <label htmlFor="packed">Packed</label>
        <br />
      </fieldset>

      <br />
      <legend className="">{formInput.difficulty} Overall Difficulty</legend>
      <FloatingLabel className="custom-slider m-4 mb-6">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          name="difficulty"
          onChange={handleChange}
          value={parseInt(formInput.difficulty, 10)}
        />
        <output htmlFor="fader" />
      </FloatingLabel>
      {/*
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
      */}

      <Form.Check
        className="text-white mb-3 toggle-switch"
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
      <Button className="form-buttons" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Location</Button>
    </Form>
  );
}

LocationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.string,
    public: PropTypes.bool,
    terrain: PropTypes.string,
    slope: PropTypes.string,
    busy: PropTypes.string,
    firebaseKey: PropTypes.string,
    difficulty: PropTypes.number,
  }),
};

LocationForm.defaultProps = {
  obj: initialState,
};

export default LocationForm;
