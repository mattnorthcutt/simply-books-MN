/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { viewAuthorDetails } from '../../../api/mergedData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  const { firebaseKey } = params;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  useEffect(() => {
    if (authorDetails.last_name) {
      console.log(authorDetails);
    }
  }, [authorDetails]);

  return (
    <div
      className="d-flex flex-column align-items-center p-4"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '800px',
          width: '100%',
          padding: '30px',
          borderRadius: '15px',
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <img
            src={authorDetails.image}
            alt="author pic"
            style={{
              width: '180px',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '20%',
              marginBottom: '20px',
            }}
          />
          <h3
            style={{
              color: '#343a40',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            {authorDetails.first_name} {authorDetails.last_name}
            {authorDetails.favorite ? ' 🤍' : ''}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#6c757d',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
          </p>
        </div>
        <hr />
        <div>
          <h5
            style={{
              color: '#495057',
              marginBottom: '10px',
            }}
          >
            Books:
          </h5>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {authorDetails.books && authorDetails.books.length > 0 ? (
              authorDetails.books.map((book) => (
                <div
                  key={book.firebaseKey}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      marginBottom: '10px',
                    }}
                  />
                  <h6
                    style={{
                      fontSize: '16px',
                      color: '#343a40',
                      marginBottom: '10px',
                    }}
                  >
                    {book.title}
                  </h6>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '14px', color: '#6c757d' }}>No books available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
