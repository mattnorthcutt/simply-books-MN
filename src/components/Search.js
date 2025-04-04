'use client';

import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function Search({ onSearch, type = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const getSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      onSearch(term.toLowerCase());
    },
    [onSearch],
  );

  const getHolder = () => {
    if (type === 'books') return 'Search Book Titles...';
    if (type === 'authors') return 'Search Author Name...';
    return 'Search';
  };

  return (
    <div className="search-container">
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder={getHolder()}
          value={searchTerm}
          onChange={getSearch}
          style={{
            fontSize: '20px',
            marginBottom: '25px',
            borderWidth: '2px',
            borderColor: 'lightgrey',
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
