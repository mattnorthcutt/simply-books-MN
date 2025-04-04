'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBook, updateBook } from '../api/bookData';

function BookCard({ bookObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.firebaseKey).then(() => onUpdate());
    }
  };

  const privateBook = () => {
    const payload = {
      firebaseKey: bookObj.firebaseKey,
      public: 'false',
    };
    updateBook(payload).then(() => onUpdate());
  };
  const publicBook = () => {
    const payload = {
      firebaseKey: bookObj.firebaseKey,
      public: 'true',
    };
    updateBook(payload).then(() => onUpdate());
  };

  let privateButton = null;

  if (bookObj?.public === 'true') {
    privateButton = (
      <Button
        onClick={privateBook}
        className="private-btn"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        Private Your Book
      </Button>
    );
  } else if (bookObj?.public === 'false') {
    privateButton = (
      <Button
        onClick={publicBook}
        className="public-btn"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        Public Your Book
      </Button>
    );
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <p className="card-text bold">
          {bookObj.sale && (
            <span>
              SALE
              <br />
            </span>
          )}{' '}
          ${bookObj.price}
        </p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/book/${bookObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBook} className="m-2">
          DELETE
        </Button>
        {privateButton}
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
