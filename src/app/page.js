'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';
import Search from '../components/Search';

function Home() {
  // TODO: Set a state for books
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then((fetchBooks) => {
      setBooks(fetchBooks);
      setFilterBooks(fetchBooks);
    });
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  const getSearch = (term) => {
    const filter = books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()));
    setFilterBooks(filter);
  };

  return (
    <div className="text-center my-4">
      <Search type="books" onSearch={getSearch} />
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {filterBooks.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
