'use client';

import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

// HUGE THANKS TO OZZY, I was lazy and didn't want to make the component so ozzy was super kind to just send his to me!
export default function Search({ onSearch, type = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      onSearch(term.toLowerCase());
    },
    [onSearch],
  );

  const getPlaceholder = () => {
    if (type === 'books') return 'Search Book Titles...';
    if (type === 'authors') return 'Search Author Last Name...';
    return 'Search';
  };

  return (
    <div className="search-container">
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder={getPlaceholder()}
          value={searchTerm}
          onChange={handleSearch}
          style={{
            fontSize: '1.2rem',
            marginBottom: '35px',
            borderWidth: '4px',
            borderColor: '#ffc107',
            borderStyle: 'solid',
          }}
        />
      </InputGroup>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['books', 'authors']),
};
