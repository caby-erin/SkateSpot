import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createNeighborhood, updateNeighborhood } from '../../api/neighborhoodData';

const initialState = {
  name: '',
};

function NeighborhoodForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateNeighborhood(formInput).then(() => router.push(`/neighborhood/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNeighborhood(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateNeighborhood(patchPayload).then(() => {
          router.push('/neighborhood');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Neighborhood</h2>

      {/* NAME */}
      <FloatingLabel controlId="floatingInput1" label="Neighborhood Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name of Neighborhood"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button className="form-buttons" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Neighborhood</Button>
    </Form>
  );
}

NeighborhoodForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NeighborhoodForm.defaultProps = {
  obj: initialState,
};

export default NeighborhoodForm;
