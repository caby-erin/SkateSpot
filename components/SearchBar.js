import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    console.warn('e.target.value', e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
  };

  return (
    <>
      <div className="searchBarAndButton">
        <Form onSubmit={handleSubmit}>
          <div className="searchBox">
            <input
              className="form-control"
              id="search"
              name="search"
              placeholder="Search Locations"
              onChange={handleChange}
              type="text"
              value={searchInput}
            />
            <Button variant="success" type="submit" size="sm" className="searchButton">🔎</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
