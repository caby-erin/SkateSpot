import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
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
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
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

      <div className="radiobuttons">
        <ToggleButtonGroup type="radio" name="terrain" defaultValue={formInput.terrain}>
          <p>Terrain: </p>
          <ToggleButton id="tbg-radio-1" value="Smooth" onChange={handleChange}>
            Smooth
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value="Mid" onChange={handleChange}>
            Mid
          </ToggleButton>
          <ToggleButton id="tbg-radio-3" value="Bumpy" onChange={handleChange}>
            Bumpy
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <br />

      <div className="radiobuttons">
        <ToggleButtonGroup type="radio" name="slope" defaultValue={formInput.slope}>
          <p>Slope: </p>
          <ToggleButton id="tbg-radio-4" value="Flat" onChange={handleChange}>
            Flat
          </ToggleButton>
          <ToggleButton id="tbg-radio-5" value="Mid" onChange={handleChange}>
            Mid
          </ToggleButton>
          <ToggleButton id="tbg-radio-6" value="Steep" onChange={handleChange}>
            Steep
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <br />
      <div className="radiobuttons">
        <ToggleButtonGroup type="radio" name="busy" defaultValue={formInput.busy}>
          <p>How Busy: </p>
          <ToggleButton id="tbg-radio-7" value="Vacant" onChange={handleChange}>
            Vacant
          </ToggleButton>
          <ToggleButton id="tbg-radio-8" value="Mid" onChange={handleChange}>
            Mid
          </ToggleButton>
          <ToggleButton id="tbg-radio-9" value="Packed" onChange={handleChange}>
            Packed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

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
